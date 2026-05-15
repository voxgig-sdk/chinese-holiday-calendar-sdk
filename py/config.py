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
            "auth": {
                "prefix": "Bearer",
            },
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
            "name": "date",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "is_off_day",
            "req": True,
            "type": "`$BOOLEAN`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "name",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 2,
          },
        ],
        "name": "holiday",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": 2024,
                      "kind": "param",
                      "name": "id",
                      "orig": "year",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
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
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
