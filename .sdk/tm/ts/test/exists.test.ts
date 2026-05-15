
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ChineseHolidayCalendarSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ChineseHolidayCalendarSDK.test()
    equal(null !== testsdk, true)
  })

})
