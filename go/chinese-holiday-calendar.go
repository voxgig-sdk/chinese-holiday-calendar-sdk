package voxgigchineseholidaycalendarsdk

import (
	"github.com/voxgig-sdk/chinese-holiday-calendar-sdk/core"
	"github.com/voxgig-sdk/chinese-holiday-calendar-sdk/entity"
	"github.com/voxgig-sdk/chinese-holiday-calendar-sdk/feature"
	_ "github.com/voxgig-sdk/chinese-holiday-calendar-sdk/utility"
)

// Type aliases preserve external API.
type ChineseHolidayCalendarSDK = core.ChineseHolidayCalendarSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type ChineseHolidayCalendarEntity = core.ChineseHolidayCalendarEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type ChineseHolidayCalendarError = core.ChineseHolidayCalendarError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewHolidayEntityFunc = func(client *core.ChineseHolidayCalendarSDK, entopts map[string]any) core.ChineseHolidayCalendarEntity {
		return entity.NewHolidayEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewChineseHolidayCalendarSDK = core.NewChineseHolidayCalendarSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
