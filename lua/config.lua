-- ChineseHolidayCalendar SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "ChineseHolidayCalendar",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://api.jiejiariapi.com/v1",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["holiday"] = {},
      },
    },
    entity = {
      ["holiday"] = {
        ["fields"] = {
          {
            ["name"] = "date",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "isOffDay",
            ["req"] = true,
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "name",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "holiday",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 2024,
                      ["kind"] = "param",
                      ["name"] = "id",
                      ["orig"] = "year",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/holidays/{year}",
                ["parts"] = {
                  "holidays",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["year"] = "id",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
