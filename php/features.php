<?php
declare(strict_types=1);

// ChineseHolidayCalendar SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class ChineseHolidayCalendarFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new ChineseHolidayCalendarBaseFeature();
            case "test":
                return new ChineseHolidayCalendarTestFeature();
            default:
                return new ChineseHolidayCalendarBaseFeature();
        }
    }
}
