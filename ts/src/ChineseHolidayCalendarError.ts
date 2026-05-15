
import { Context } from './Context'


class ChineseHolidayCalendarError extends Error {

  isChineseHolidayCalendarError = true

  sdk = 'ChineseHolidayCalendar'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ChineseHolidayCalendarError
}

