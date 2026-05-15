<?php
declare(strict_types=1);

// ChineseHolidayCalendar SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class ChineseHolidayCalendarMakeContext
{
    public static function call(array $ctxmap, ?ChineseHolidayCalendarContext $basectx): ChineseHolidayCalendarContext
    {
        return new ChineseHolidayCalendarContext($ctxmap, $basectx);
    }
}
