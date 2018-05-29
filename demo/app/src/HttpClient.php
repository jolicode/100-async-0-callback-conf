<?php

declare(strict_types=1);

namespace App;

class HttpClient implements HttpClientInterface
{
    public function request($url): string
    {
        return file_get_contents($url);
    }
}
