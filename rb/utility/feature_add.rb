# ChineseHolidayCalendar SDK utility: feature_add
module ChineseHolidayCalendarUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
