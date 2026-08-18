# ChineseHolidayCalendar SDK configuration

module ChineseHolidayCalendarConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "ChineseHolidayCalendar",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.jiejiariapi.com/v1",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "holiday" => {},
        },
      },
      "entity" => {
        "holiday" => {
          "fields" => [
            {
              "name" => "date",
              "req" => true,
              "type" => "`$STRING`",
            },
            {
              "name" => "isOffDay",
              "req" => true,
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "name",
              "req" => true,
              "type" => "`$STRING`",
            },
          ],
          "name" => "holiday",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 2024,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "year",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/holidays/{year}",
                  "parts" => [
                    "holidays",
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "year" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "id",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    ChineseHolidayCalendarFeatures.make_feature(name)
  end
end
