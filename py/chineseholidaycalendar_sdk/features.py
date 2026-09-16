# ChineseHolidayCalendar SDK feature factory

from chineseholidaycalendar_sdk.feature.base_feature import ChineseHolidayCalendarBaseFeature
from chineseholidaycalendar_sdk.feature.ratelimit_feature import ChineseHolidayCalendarRatelimitFeature
from chineseholidaycalendar_sdk.feature.retry_feature import ChineseHolidayCalendarRetryFeature
from chineseholidaycalendar_sdk.feature.test_feature import ChineseHolidayCalendarTestFeature
from chineseholidaycalendar_sdk.feature.timeout_feature import ChineseHolidayCalendarTimeoutFeature


_FEATURES = {
    "base": lambda: ChineseHolidayCalendarBaseFeature(),
    "ratelimit": lambda: ChineseHolidayCalendarRatelimitFeature(),
    "retry": lambda: ChineseHolidayCalendarRetryFeature(),
    "test": lambda: ChineseHolidayCalendarTestFeature(),
    "timeout": lambda: ChineseHolidayCalendarTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
