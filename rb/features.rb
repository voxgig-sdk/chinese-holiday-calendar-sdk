# ChineseHolidayCalendar SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module ChineseHolidayCalendarFeatures
  def self.make_feature(name)
    case name
    when "base"
      ChineseHolidayCalendarBaseFeature.new
    when "ratelimit"
      ChineseHolidayCalendarRatelimitFeature.new
    when "retry"
      ChineseHolidayCalendarRetryFeature.new
    when "test"
      ChineseHolidayCalendarTestFeature.new
    when "timeout"
      ChineseHolidayCalendarTimeoutFeature.new
    else
      ChineseHolidayCalendarBaseFeature.new
    end
  end
end
