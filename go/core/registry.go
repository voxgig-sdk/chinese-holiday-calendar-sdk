package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewHolidayEntityFunc func(client *ChineseHolidayCalendarSDK, entopts map[string]any) ChineseHolidayCalendarEntityBase

