# ChineseHolidayCalendar SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ChineseHolidayCalendar",
            "slug": "chinese-holiday-calendar",
            "version": "0.0.1",
            "target": "py",
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
            "name": "date",
            "req": True,
            "short": "The date of the holiday in YYYY-MM-DD format",
            "type": "`$STRING`",
          },
          {
            "name": "isOffDay",
            "req": True,
            "short": "Whether this is an official day off (true) or a working day during a holiday period (false)",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "name",
            "req": True,
            "short": "The name of the holiday in Chinese",
            "type": "`$STRING`",
          },
        ],
        "name": "holiday",
        "op": {
          "load": {
            "input": "data",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
