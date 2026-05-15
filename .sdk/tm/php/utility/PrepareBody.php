<?php
declare(strict_types=1);

// ChineseHolidayCalendar SDK utility: prepare_body

class ChineseHolidayCalendarPrepareBody
{
    public static function call(ChineseHolidayCalendarContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
