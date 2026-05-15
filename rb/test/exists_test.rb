# ChineseHolidayCalendar SDK exists test

require "minitest/autorun"
require_relative "../ChineseHolidayCalendar_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = ChineseHolidayCalendarSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
