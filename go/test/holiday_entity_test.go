package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/chinese-holiday-calendar-sdk/go"
	"github.com/voxgig-sdk/chinese-holiday-calendar-sdk/go/core"

	vs "github.com/voxgig-sdk/chinese-holiday-calendar-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const holidayEntityLiveStrict = true


func TestHolidayEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Holiday(nil)
		if ent == nil {
			t.Fatal("expected non-nil HolidayEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Holiday(nil).Load(map[string]any{"id": "x"}, nil)
		if sdkerr, ok := err.(*core.ChineseHolidayCalendarError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := holidayBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "holiday." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _liveKey, _liveEx := range map[string]any{"holiday01": float64(2024)} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					setup.idmap[_liveKey] = _liveEx
				}
			}
		}
		client := setup.client
		_ = client
		if setup.live {
			liveExisting(t, holidayEntityLiveStrict, setup.data, "holiday", func() (any, error) {
				return []any{map[string]any{"id": setup.idmap["holiday01"]}}, nil
			})
		}

		// Bootstrap entity data from existing test data (no create step in flow).
		holidayRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.holiday")))
		var holidayRef01Data map[string]any
		if len(holidayRef01DataRaw) > 0 {
			holidayRef01Data = core.ToMapAny(holidayRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = holidayRef01Data

		// LOAD
		holidayRef01Ent := client.Holiday(nil)
		holidayRef01MatchDt0 := map[string]any{
			"id": holidayRef01Data["id"],
		}
		holidayRef01DataDt0Loaded, err := holidayRef01Ent.Load(holidayRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		holidayRef01DataDt0LoadResult := core.ToMapAny(entityData(holidayRef01DataDt0Loaded))
		if holidayRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if holidayRef01DataDt0LoadResult["id"] != holidayRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func holidayBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "holiday", "HolidayTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read holiday test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse holiday test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"holiday01", "holiday02", "holiday03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("CHINESE_HOLIDAY_CALENDAR_TEST_HOLIDAY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CHINESE_HOLIDAY_CALENDAR_TEST_HOLIDAY_ENTID": idmap,
		"CHINESE_HOLIDAY_CALENDAR_TEST_LIVE":      "FALSE",
		"CHINESE_HOLIDAY_CALENDAR_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["CHINESE_HOLIDAY_CALENDAR_TEST_HOLIDAY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CHINESE_HOLIDAY_CALENDAR_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewChineseHolidayCalendarSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CHINESE_HOLIDAY_CALENDAR_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CHINESE_HOLIDAY_CALENDAR_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
