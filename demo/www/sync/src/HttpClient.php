<?php

declare(strict_types=1);

namespace App;

class HttpClient
{
    public function request($url)
    {
        return file_get_contents($url);
    }
}
