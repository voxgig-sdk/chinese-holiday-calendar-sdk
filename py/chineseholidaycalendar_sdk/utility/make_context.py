# ChineseHolidayCalendar SDK utility: make_context

from chineseholidaycalendar_sdk.core.context import ChineseHolidayCalendarContext


def make_context_util(ctxmap, basectx):
    return ChineseHolidayCalendarContext(ctxmap, basectx)
