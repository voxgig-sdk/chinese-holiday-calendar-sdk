<?php
declare(strict_types=1);

// ChineseHolidayCalendar SDK utility: feature_add

class ChineseHolidayCalendarFeatureAdd
{
    public static function call(ChineseHolidayCalendarContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
