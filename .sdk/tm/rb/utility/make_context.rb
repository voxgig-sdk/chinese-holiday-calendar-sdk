# ChineseHolidayCalendar SDK utility: make_context
require_relative '../core/context'
module ChineseHolidayCalendarUtilities
  MakeContext = ->(ctxmap, basectx) {
    ChineseHolidayCalendarContext.new(ctxmap, basectx)
  }
end
