<?php
declare(strict_types=1);

// ChineseHolidayCalendar SDK configuration

class ChineseHolidayCalendarConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
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
              'name' => 'date',
              'req' => true,
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isOffDay',
              'req' => true,
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'name',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'holiday',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 2024,
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'year',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
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
                ],
              ],
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
