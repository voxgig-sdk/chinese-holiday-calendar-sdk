# ChineseHolidayCalendar SDK configuration


def make_config():
    return {
        "main": {
            "name": "ChineseHolidayCalendar",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.jiejiariapi.com/v1",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "holiday": {},
            },
        },
        "entity": {
      "holiday": {
        "fields": [
          {
            "active": True,
            "name": "date",
            "req": True,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "isOffDay",
            "req": True,
            "type": "`$BOOLEAN`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "holiday",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": 2024,
                      "kind": "param",
                      "name": "id",
                      "orig": "year",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "index$": 0,
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/holidays/{year}",
                "parts": [
                  "holidays",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "year": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
