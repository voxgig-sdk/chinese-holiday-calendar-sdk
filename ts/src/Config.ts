
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'ChineseHolidayCalendar',
        slug: "chinese-holiday-calendar",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.jiejiariapi.com/v1",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      holiday: {
      },

    }
  }


  entity = {
    "holiday": {
      "fields": [
        {
          "name": "date",
          "req": true,
          "short": "The date of the holiday in YYYY-MM-DD format",
          "type": "`$STRING`"
        },
        {
          "name": "isOffDay",
          "req": true,
          "short": "Whether this is an official day off (true) or a working day during a holiday period (false)",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "name",
          "req": true,
          "short": "The name of the holiday in Chinese",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/holidays/{year}",
              "parts": [
                "holidays",
                "{id}"
              ],
              "rename": {
                "param": {
                  "year": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

