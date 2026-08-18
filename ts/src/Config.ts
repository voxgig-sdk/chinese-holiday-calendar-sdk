
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


  main = {
    name: 'ChineseHolidayCalendar',
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
          "type": "`$STRING`"
        },
        {
          "name": "isOffDay",
          "req": true,
          "type": "`$BOOLEAN`"
        },
        {
          "name": "name",
          "req": true,
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

