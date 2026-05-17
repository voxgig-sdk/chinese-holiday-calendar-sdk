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

func TestHolidayEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Holiday(nil)
		if ent == nil {
			t.Fatal("expected non-nil HolidayEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
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
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set CHINESEHOLIDAYCALENDAR_TEST_HOLIDAY_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		holidayRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.holiday", setup.data)))
		var holidayRef01Data map[string]any
		if len(holidayRef01DataRaw) > 0 {
			holidayRef01Data = core.ToMapAny(holidayRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = holidayRef01Data

		// LOAD
		holidayRef01Ent := client.Holiday(nil)
		holidayRef01MatchDt0 := map[string]any{}
		holidayRef01DataDt0Loaded, err := holidayRef01Ent.Load(holidayRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if holidayRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
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
	idmap := vs.Transform(
		[]any{"holiday01", "holiday02", "holiday03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("CHINESEHOLIDAYCALENDAR_TEST_HOLIDAY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"CHINESEHOLIDAYCALENDAR_TEST_HOLIDAY_ENTID": idmap,
		"CHINESEHOLIDAYCALENDAR_TEST_LIVE":      "FALSE",
		"CHINESEHOLIDAYCALENDAR_TEST_EXPLAIN":   "FALSE",
		"CHINESEHOLIDAYCALENDAR_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["CHINESEHOLIDAYCALENDAR_TEST_HOLIDAY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["CHINESEHOLIDAYCALENDAR_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["CHINESEHOLIDAYCALENDAR_APIKEY"],
			},
			extra,
		})
		client = sdk.NewChineseHolidayCalendarSDK(core.ToMapAny(mergedOpts))
	}

	live := env["CHINESEHOLIDAYCALENDAR_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["CHINESEHOLIDAYCALENDAR_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
