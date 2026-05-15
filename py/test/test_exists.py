# ProjectName SDK exists test

import pytest
from chineseholidaycalendar_sdk import ChineseHolidayCalendarSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ChineseHolidayCalendarSDK.test(None, None)
        assert testsdk is not None
