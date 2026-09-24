
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ChineseHolidayCalendarSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = ChineseHolidayCalendarSDK.test()
    equal(testsdk instanceof ChineseHolidayCalendarSDK, true,
      'ChineseHolidayCalendarSDK.test() must return a client synchronously')
  })

})
