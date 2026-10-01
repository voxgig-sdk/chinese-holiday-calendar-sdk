import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "holiday",
    "accessor": "Holiday",
    "op": "load",
    "method": "GET",
    "path": "/holidays/{year}",
    "args": [
      {
        "name": "id",
        "wire": "year",
        "value": 2024
      }
    ],
    "select": {},
    "headers": [],
    "query": [],
    "auth": null,
    "status": 200,
    "sample": {
      "2024-01-01": {
        "date": "2024-01-01",
        "name": "元旦",
        "isOffDay": true
      },
      "2024-02-10": {
        "date": "2024-02-10",
        "name": "春节",
        "isOffDay": true
      },
      "2024-04-04": {
        "date": "2024-04-04",
        "name": "清明节",
        "isOffDay": true
      },
      "key$": "example"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
