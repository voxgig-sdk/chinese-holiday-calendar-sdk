# Holiday entity test

require "minitest/autorun"
require "json"
require_relative "../ChineseHolidayCalendar_sdk"
require_relative "runner"

class HolidayEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = ChineseHolidayCalendarSDK.test(nil, nil)
    ent = testsdk.Holiday(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = ChineseHolidayCalendarConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = ChineseHolidayCalendarSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Holiday(nil).load({ "year" => "x" }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = holiday_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    [].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "holiday." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      skip("Live coverage incomplete: the flow has no step to run")
    end

    client = setup[:client]

    # Bootstrap entity data from existing test data.
    holiday_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.holiday")))
    holiday_ref01_data = nil
    if holiday_ref01_data_raw.length > 0
      holiday_ref01_data = Helpers.to_map(holiday_ref01_data_raw[0][1])
    end

  end
end

def holiday_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "holiday", "HolidayTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = ChineseHolidayCalendarSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["holiday01", "holiday02", "holiday03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["CHINESE_HOLIDAY_CALENDAR_TEST_HOLIDAY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "CHINESE_HOLIDAY_CALENDAR_TEST_HOLIDAY_ENTID" => idmap,
    "CHINESE_HOLIDAY_CALENDAR_TEST_LIVE" => "FALSE",
    "CHINESE_HOLIDAY_CALENDAR_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["CHINESE_HOLIDAY_CALENDAR_TEST_HOLIDAY_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["CHINESE_HOLIDAY_CALENDAR_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = ChineseHolidayCalendarSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["CHINESE_HOLIDAY_CALENDAR_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["CHINESE_HOLIDAY_CALENDAR_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
