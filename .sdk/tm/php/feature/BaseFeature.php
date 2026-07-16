<?php
declare(strict_types=1);

// ChineseHolidayCalendar SDK base feature

class ChineseHolidayCalendarBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(ChineseHolidayCalendarContext $ctx, array $options): void {}
    public function PostConstruct(ChineseHolidayCalendarContext $ctx): void {}
    public function PostConstructEntity(ChineseHolidayCalendarContext $ctx): void {}
    public function SetData(ChineseHolidayCalendarContext $ctx): void {}
    public function GetData(ChineseHolidayCalendarContext $ctx): void {}
    public function GetMatch(ChineseHolidayCalendarContext $ctx): void {}
    public function SetMatch(ChineseHolidayCalendarContext $ctx): void {}
    public function PrePoint(ChineseHolidayCalendarContext $ctx): void {}
    public function PreSpec(ChineseHolidayCalendarContext $ctx): void {}
    public function PreRequest(ChineseHolidayCalendarContext $ctx): void {}
    public function PreResponse(ChineseHolidayCalendarContext $ctx): void {}
    public function PreResult(ChineseHolidayCalendarContext $ctx): void {}
    public function PreDone(ChineseHolidayCalendarContext $ctx): void {}
    public function PreUnexpected(ChineseHolidayCalendarContext $ctx): void {}
}
