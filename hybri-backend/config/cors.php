<?php

return [
    'paths' => ['api/*', 'odata/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'], // or ['GET', 'POST', 'PUT', 'DELETE']

    'allowed_origins' => ['*'], // or specify domains like ['https://example.com']

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];