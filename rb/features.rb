# ChineseHolidayCalendar SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module ChineseHolidayCalendarFeatures
  def self.make_feature(name)
    case name
    when "base"
      ChineseHolidayCalendarBaseFeature.new
    when "test"
      ChineseHolidayCalendarTestFeature.new
    else
      ChineseHolidayCalendarBaseFeature.new
    end
  end
end
