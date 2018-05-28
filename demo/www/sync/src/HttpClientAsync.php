<?php

declare(strict_types=1);

namespace App;

use Amp\Artax\DefaultClient;
use Amp\Artax\Response;
use function Amp\GreenThread\await;

class HttpClientAsync
{
    private $client;

    public function __construct()
    {
        $this->client = new DefaultClient();
    }

    public function request($url)
    {
        /** @var Response $response */
        $response = await($this->client->request($url));

        return await($response->getBody());
    }
}
