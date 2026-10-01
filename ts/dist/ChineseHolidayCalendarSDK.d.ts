import { HolidayEntity } from './entity/HolidayEntity';
export type * from './ChineseHolidayCalendarTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { ChineseHolidayCalendarEntityBase } from './ChineseHolidayCalendarEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class ChineseHolidayCalendarSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Holiday(entopts?: Record<string, any>): HolidayEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): ChineseHolidayCalendarSDK;
    tester(testopts?: any, sdkopts?: any): ChineseHolidayCalendarSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof ChineseHolidayCalendarSDK;
export { stdutil, config, BaseFeature, ChineseHolidayCalendarEntityBase, ChineseHolidayCalendarSDK, SDK, };
