package = "voxgig-sdk-chinese-holiday-calendar"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/chinese-holiday-calendar-sdk.git"
}
description = {
  summary = "ChineseHolidayCalendar SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["chinese-holiday-calendar_sdk"] = "chinese-holiday-calendar_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
