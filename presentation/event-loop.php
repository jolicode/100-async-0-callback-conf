<?php

$eventLoopRegistry = [];

function sendRequestAsync($request, $onResolve) use(&$eventLoopRegistry) {
    $stream = fsockopen('tcp://127.0.0.1', 80);
    stream_set_blocking($stream, false);
    fwrite($stream, (string) $request);

    $eventLoopRegistry[(int)$stream] = [
        'stream' => $stream,
        'onResolve' =>  function ($readed) use($onResolve) {
            $onResolve($readed);
        },
    ];
}

function dispatch(array $eventLoopRegistry) {
    $streams = [];

    foreach ($eventLoopRegistry as $streamId => $watcher) {
        $streams[] = $watcher['stream'];
    }

    stream_select($streams, $write = NULL, $except = NULL, 0);

    foreach ($streams as $changedStream) {
        $onResolve = $eventLoopRegistry[(int)$changedStream]['onResolve'];
        $onResolve(fread($changedStream, 8192));

        unset($eventLoopRegistry[(int)$changedStream]);
    }

    if (count($eventLoopRegistry) > 0) {
        dispatch($eventLoopRegistry);
    }
}

sendRequestAsync($fooRequest, function ($response) {
    echo 'Done';
});
sendRequestAsync($barRequest, function ($response) {
    echo 'Done 2';
});

dispatch($eventLoopRegistry);
