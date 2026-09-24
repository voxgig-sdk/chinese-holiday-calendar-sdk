

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"date":{"a":true,"fo":"date","h":"Date","n":"date","r":true,"sh":"The date of the holiday in YYYY-MM-DD format","t":"`$STRING`","key$":"date","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":1},"isOffDay":{"a":true,"h":"Is Off Day","n":"isOffDay","r":true,"sh":"Whether this is an official day off (true) or a working day during a holiday period (false)","t":"`$BOOLEAN`","key$":"isOffDay","index$":2},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the holiday in Chinese","t":"`$STRING`","key$":"name","index$":3}},"id":{"field":"id","name":"id"},"name":"holiday","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /holidays/{year}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":2024,"k":"param","n":"id","or":"year","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/holidays/{year}","q":{"exist":["id"]},"r":{"param":{"year":"id"}},"s":[{"lit":"holidays"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"holiday","name__orig":"holiday","Name":"Holiday","name_":"holiday","name-":"holiday","NAME":"HOLIDAY","index$":0}, {"active":true,"entity":"holiday","key$":"BasicHolidayFlow","kind":"basic","name":"BasicHolidayFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"holiday_ref01","srcdatavar":"holiday_ref01_data","suffix":"_dt0"},"m":{"id":"holiday01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-holiday_ref01"}}],"index$":0}]}, 'Holiday', {"GET /holidays/{year}":{"protocol":"http","operationId":"getHolidaysByYear","responses":{"200":{"description":"Successful response with holiday data","content":{"application/json":{"schema":{"type":"object","additionalProperties":{"type":"object","properties":{"date":{"type":"string","format":"date","description":"The date of the holiday in YYYY-MM-DD format","example":"2024-01-01","key$":"date"},"name":{"type":"string","description":"The name of the holiday in Chinese","example":"元旦","key$":"name"},"isOffDay":{"type":"boolean","description":"Whether this is an official day off (true) or a working day during a holiday period (false)","example":true,"key$":"isOffDay"}},"required":["date","name","isOffDay"],"x-ref":"#/components/schemas/Holiday","key$":"additionalProperties"},"example":{"2024-01-01":{"date":"2024-01-01","name":"元旦","isOffDay":true},"2024-02-10":{"date":"2024-02-10","name":"春节","isOffDay":true},"2024-04-04":{"date":"2024-04-04","name":"清明节","isOffDay":true},"key$":"example"}}}}},"404":{"description":"Year not found or no data available","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"integer","description":"Error code"}},"x-ref":"#/components/schemas/Error"}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"},"code":{"type":"integer","description":"Error code"}},"x-ref":"#/components/schemas/Error"}}}}},"parameters":[{"name":"year","in":"path","required":true,"description":"The year for which to retrieve holidays (e.g., 2024)","schema":{"type":"integer","minimum":2000,"maximum":2100,"example":2024},"index$":0}],"securitySource":"unspecified"}})
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
  
