<?php
declare(strict_types=1);

// ChineseHolidayCalendar SDK exists test

require_once __DIR__ . '/../chineseholidaycalendar_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = ChineseHolidayCalendarSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
