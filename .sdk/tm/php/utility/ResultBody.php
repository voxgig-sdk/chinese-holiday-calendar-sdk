<?php
declare(strict_types=1);

// ChineseHolidayCalendar SDK utility: result_body

class ChineseHolidayCalendarResultBody
{
    public static function call(ChineseHolidayCalendarContext $ctx): ?ChineseHolidayCalendarResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
