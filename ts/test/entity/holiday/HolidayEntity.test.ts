

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ChineseHolidayCalendarSDK, BaseFeature, config, stdutil } from '../../..'

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


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = ChineseHolidayCalendarSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Holiday().load({"year":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.CHINESE_HOLIDAY_CALENDAR_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'holiday.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"date":{"a":true,"fo":"date","h":"Date","n":"date","r":true,"sh":"The date of the holiday in YYYY-MM-DD format","t":"`$STRING`","key$":"date","index$":0},"isOffDay":{"a":true,"h":"Is Off Day","n":"isOffDay","r":true,"sh":"Whether this is an official day off (true) or a working day during a holiday period (false)","t":"`$BOOLEAN`","key$":"isOffDay","index$":1},"name":{"a":true,"h":"Name","n":"name","r":true,"sh":"The name of the holiday in Chinese","t":"`$STRING`","key$":"name","index$":2}},"name":"holiday","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /holidays/{year}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":2024,"k":"param","n":"year","or":"year","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/holidays/{year}","q":{"exist":["year"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"holidays"},{"var":"year"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"holiday","name__orig":"holiday","Name":"Holiday","name_":"holiday","name-":"holiday","NAME":"HOLIDAY","index$":0}, {"active":true,"entity":"holiday","key$":"BasicHolidayFlow","kind":"basic","name":"BasicHolidayFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"holiday_ref01","srcdatavar":"holiday_ref01_data","suffix":"_dt0"},"m":{"id":"holiday01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-holiday_ref01"}}],"unreachable":true}]}, 'Holiday', {"GET /holidays/{year}":{"protocol":"http","parameters":[{"name":"year","in":"path","required":true,"description":"The year for which to retrieve holidays (e.g., 2024)","schema":{"type":"integer","minimum":2000,"maximum":2100,"example":2024},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let holiday_ref01_data = Object.values(setup.data.existing.holiday)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

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
  
