-- ChineseHolidayCalendar SDK error

local ChineseHolidayCalendarError = {}
ChineseHolidayCalendarError.__index = ChineseHolidayCalendarError


function ChineseHolidayCalendarError.new(code, msg, ctx)
  local self = setmetatable({}, ChineseHolidayCalendarError)
  self.is_sdk_error = true
  self.sdk = "ChineseHolidayCalendar"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function ChineseHolidayCalendarError:error()
  return self.msg
end


function ChineseHolidayCalendarError:__tostring()
  return self.msg
end


return ChineseHolidayCalendarError
