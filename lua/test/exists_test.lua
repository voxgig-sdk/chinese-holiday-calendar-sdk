-- ChineseHolidayCalendar SDK exists test

local sdk = require("chinese-holiday-calendar_sdk")

describe("ChineseHolidayCalendarSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
