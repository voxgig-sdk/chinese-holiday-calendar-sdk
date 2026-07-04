# frozen_string_literal: true

# Typed models for the ChineseHolidayCalendar SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Holiday entity data model.
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] is_off_day
#   @return [Boolean]
#
# @!attribute [rw] name
#   @return [String]
Holiday = Struct.new(
  :date,
  :is_off_day,
  :name,
  keyword_init: true
)

# Request payload for Holiday#load.
#
# @!attribute [rw] id
#   @return [Integer]
HolidayLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

