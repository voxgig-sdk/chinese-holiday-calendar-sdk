package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewHolidayEntityFunc func(client *ChineseHolidayCalendarSDK, entopts map[string]any) ChineseHolidayCalendarEntity

