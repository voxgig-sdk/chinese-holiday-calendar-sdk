package core

type ChineseHolidayCalendarError struct {
	IsChineseHolidayCalendarError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewChineseHolidayCalendarError(code string, msg string, ctx *Context) *ChineseHolidayCalendarError {
	return &ChineseHolidayCalendarError{
		IsChineseHolidayCalendarError: true,
		Sdk:              "ChineseHolidayCalendar",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *ChineseHolidayCalendarError) Error() string {
	return e.Msg
}
