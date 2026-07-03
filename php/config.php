<?php
declare(strict_types=1);

// ChineseHolidayCalendar SDK configuration

class ChineseHolidayCalendarConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "ChineseHolidayCalendar",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.jiejiariapi.com/v1",
                "auth" => [
                    "prefix" => "Bearer",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "holiday" => [],
                ],
            ],
            "entity" => [
        'holiday' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'date',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'is_off_day',
              'req' => true,
              'type' => '`$BOOLEAN`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
          ],
          'name' => 'holiday',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 2024,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'year',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/holidays/{year}',
                  'parts' => [
                    'holidays',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'year' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return ChineseHolidayCalendarFeatures::make_feature($name);
    }
}
