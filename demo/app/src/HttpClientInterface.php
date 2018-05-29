<?php

declare(strict_types=1);

namespace App;

interface HttpClientInterface
{
    public function request($url): string;
}
