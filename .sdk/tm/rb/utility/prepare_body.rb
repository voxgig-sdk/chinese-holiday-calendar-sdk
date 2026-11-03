# ChineseHolidayCalendar SDK utility: prepare_body
require_relative 'media'
module ChineseHolidayCalendarUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return ChineseHolidayCalendarUtilities.raw_body(ctx.reqdata) if ChineseHolidayCalendarUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
