

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ChineseHolidayCalendarSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('HolidayEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when CHINESE_HOLIDAY_CALENDAR_TEST_LIVE=TRUE.
  afterEach(liveDelay('CHINESE_HOLIDAY_CALENDAR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ChineseHolidayCalendarSDK.test()
    const ent = testsdk.Holiday()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CHINESE_HOLIDAY_CALENDAR_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'holiday.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date","name":"date","req":true,"short":"The date of the holiday in YYYY-MM-DD format","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":1},{"active":true,"name":"isOffDay","req":true,"short":"Whether this is an official day off (true) or a working day during a holiday period (false)","type":"`$BOOLEAN`","index$":2},{"active":true,"name":"name","req":true,"short":"The name of the holiday in Chinese","type":"`$STRING`","index$":3}],"id":{"field":"id","name":"id"},"name":"holiday","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":2024,"kind":"param","name":"id","orig":"year","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /holidays/{year}","json":"{\"operationId\":\"getHolidaysByYear\",\"parameters\":[{\"description\":\"The year for which to retrieve holidays (e.g., 2024)\",\"in\":\"path\",\"name\":\"year\",\"required\":true,\"schema\":{\"example\":2024,\"maximum\":2100,\"minimum\":2000,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"additionalProperties\":{\"properties\":{\"date\":{\"description\":\"The date of the holiday in YYYY-MM-DD format\",\"example\":\"2024-01-01\",\"format\":\"date\",\"type\":\"string\"},\"isOffDay\":{\"description\":\"Whether this is an official day off (true) or a working day during a holiday period (false)\",\"example\":true,\"type\":\"boolean\"},\"name\":{\"description\":\"The name of the holiday in Chinese\",\"example\":\"元旦\",\"type\":\"string\"}},\"required\":[\"date\",\"name\",\"isOffDay\"],\"type\":\"object\"},\"example\":{\"2024-01-01\":{\"date\":\"2024-01-01\",\"isOffDay\":true,\"name\":\"元旦\"},\"2024-02-10\":{\"date\":\"2024-02-10\",\"isOffDay\":true,\"name\":\"春节\"},\"2024-04-04\":{\"date\":\"2024-04-04\",\"isOffDay\":true,\"name\":\"清明节\"}},\"type\":\"object\"}}},\"description\":\"Successful response with holiday data\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Year not found or no data available\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"integer\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/holidays/{year}","rename":{"param":{"year":"id"}},"segments":[{"lit":"holidays"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"holiday","name__orig":"holiday","Name":"Holiday","name_":"holiday","name-":"holiday","NAME":"HOLIDAY","index$":0}, {"active":true,"entity":"holiday","key$":"BasicHolidayFlow","kind":"basic","name":"BasicHolidayFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"holiday_ref01","srcdatavar":"holiday_ref01_data","suffix":"_dt0"},"match":{"id":"holiday01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-holiday_ref01"}}],"index$":0}]}, 'Holiday')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let holiday_ref01_data = Object.values(setup.data.existing.holiday)[0] as any

    // LOAD
    const holiday_ref01_ent = client.Holiday()
    const holiday_ref01_match_dt0: any = {}
    holiday_ref01_match_dt0.id = holiday_ref01_data.id
    const holiday_ref01_data_dt0 = (await holiday_ref01_ent.load(holiday_ref01_match_dt0)).data()
    assert(holiday_ref01_data_dt0.id === holiday_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/holiday/HolidayTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ChineseHolidayCalendarSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['holiday01','holiday02','holiday03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'CHINESE_HOLIDAY_CALENDAR_TEST_HOLIDAY_ENTID': idmap,
    'CHINESE_HOLIDAY_CALENDAR_TEST_LIVE': 'FALSE',
    'CHINESE_HOLIDAY_CALENDAR_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['CHINESE_HOLIDAY_CALENDAR_TEST_HOLIDAY_ENTID']

  const live = 'TRUE' === env.CHINESE_HOLIDAY_CALENDAR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['CHINESE_HOLIDAY_CALENDAR_TEST_HOLIDAY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ChineseHolidayCalendarSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.CHINESE_HOLIDAY_CALENDAR_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
