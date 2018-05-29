<?php
// src/Controller/LuckyController.php
namespace App\Controller;

use App\HttpClientInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Stopwatch\Stopwatch;

class HomeController
{
    private $client;

    public function __construct(HttpClientInterface $client)
    {
        $this->client = $client;
    }

    public function hello()
    {
        $stopwatch = new Stopwatch();
        $event = $stopwatch->start('profile');

        $response1 = $this->client->request('http://httpbin.org/delay/1');
        $response2 = $this->client->request('http://httpbin.org/delay/1');
        $response3 = $this->client->request('http://httpbin.org/delay/1');

        $event->stop();
        $duration = $event->getDuration();

        return new Response("Duration = {$duration}ms<br />Response 1:<br />{$response1}<br />Response 2:<br />{$response2}<br />Response 3:<br />{$response3}<br />");
    }
}
