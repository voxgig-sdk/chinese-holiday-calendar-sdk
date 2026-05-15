<?php
declare(strict_types=1);

// ChineseHolidayCalendar SDK utility: result_headers

class ChineseHolidayCalendarResultHeaders
{
    public static function call(ChineseHolidayCalendarContext $ctx): ?ChineseHolidayCalendarResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
