<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use function Amp\GreenThread\async;
use function Amp\GreenThread\await;
use App\HttpClient;
use App\HttpClientAsync;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Stopwatch\Stopwatch;

class YoloController
{
    public function hello()
    {
//        $client = new HttpClient();
        $client = new HttpClientAsync();

        $stopwatch = new Stopwatch();
        $event = $stopwatch->start('profile');

        $responses = await([
            async(function () use($client) { $client->request('http://httpbin.org/delay/1'); }),
            async(function () use($client) { $client->request('http://httpbin.org/delay/1'); }),
            async(function () use($client) { $client->request('http://httpbin.org/delay/1'); }),
        ]);

        $client->request('http://httpbin.org/delay/1');
        $client->request('http://httpbin.org/delay/1');
        $client->request('http://httpbin.org/delay/1');

        $event->stop();
        $duration = $event->getDuration();

        return new Response('Duration = ' . $duration . 'ms');
    }
}
