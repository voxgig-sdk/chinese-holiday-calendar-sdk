# ChineseHolidayCalendar SDK feature factory

from feature.base_feature import ChineseHolidayCalendarBaseFeature
from feature.test_feature import ChineseHolidayCalendarTestFeature


def _make_feature(name):
    features = {
        "base": lambda: ChineseHolidayCalendarBaseFeature(),
        "test": lambda: ChineseHolidayCalendarTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
