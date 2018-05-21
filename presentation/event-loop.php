<?php

$eventLoopRegistry = [];

function sendAsync($request, callable $onResolve) {
    $stream = fsockopen('tcp://127.0.0.1', 80);
    stream_set_blocking($stream, false);
    fwrite($stream, (string) $request);

    $eventLoopRegistry[(int)$stream] = [
        'stream' => $stream,
        'onResolve' => $onResolve,
    ];
}



function dispatchLoop(array $eventLoopRegistry) {
    $streams = [];

    foreach ($eventLoopRegistry as $watcher) {
        $streams[] = $watcher['stream'];
    }

    stream_select($streams, ..., 0);

    foreach ($streams as $changedStream) {
        $onResolve = $eventLoopRegistry[...]
        $onResolve(fread($changedStream, 8192));

        unset($eventLoopRegistry[...]);
    }

    if (count($eventLoopRegistry) > 0) {
        dispatchLoop($eventLoopRegistry);
    }
}

sendAsync($fooRequest, function ($response) {
    echo 'Done';
});
sendAsync($barRequest, function ($response) {
    echo 'Done 2';
});

dispatchLoop($eventLoopRegistry);
