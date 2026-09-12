import { ChineseHolidayCalendarEntityBase } from '../ChineseHolidayCalendarEntityBase';
import type { ChineseHolidayCalendarSDK } from '../ChineseHolidayCalendarSDK';
import type { Control } from '../types';
import type { Holiday, HolidayLoadMatch } from '../ChineseHolidayCalendarTypes';
declare class HolidayEntity extends ChineseHolidayCalendarEntityBase<Holiday> {
    constructor(client: ChineseHolidayCalendarSDK, entopts: any);
    make(this: HolidayEntity): HolidayEntity;
    load(this: any, reqmatch?: HolidayLoadMatch, ctrl?: Control): Promise<HolidayEntity>;
}
export { HolidayEntity };
