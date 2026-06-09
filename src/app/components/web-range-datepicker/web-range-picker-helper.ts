import { Injectable } from '@angular/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { DateAdapter } from '@angular/material/core';

import {
    MatDateRangeSelectionStrategy,
    DateRange,
} from '@angular/material/datepicker';


@Injectable()
export class FourteenDaySelectionStrategy<D>
    implements MatDateRangeSelectionStrategy<D>
{
    constructor(private _dateAdapter: DateAdapter<D>) { }
    off: boolean = false;
    rangeDays: number
    selectionFinished(date: D | null, currentRange: DateRange<D>): DateRange<D> {
        if (!this.off) return this._createFourteenDayRange(date);
        let { start, end } = currentRange;

        if (start == null) {
            start = date;
        } else if (
            end == null &&
            date &&
            this._dateAdapter.compareDate(date, start) >= 0
        ) {
            end = date;
        } else {
            start = date;
            end = null;
        }

        return new DateRange<D>(start, end);
    }

    createPreview(
        activeDate: D | null,
        currentRange: DateRange<D>
    ): DateRange<D> {
        if (!this.off) return this._createFourteenDayRange(activeDate);

        let start: D | null = null;
        let end: D | null = null;

        if (currentRange.start && !currentRange.end && activeDate) {
            start = currentRange.start;
            end = activeDate;
        }

        return new DateRange<D>(start, end);
    }

    private _createFourteenDayRange(date: D | null): DateRange<D> {
        if (date) {
            const start = date;
            const end = this._dateAdapter.addCalendarDays(date, this.rangeDays);
            return new DateRange<D>(start, end);
        }

        return new DateRange<D>(null, null);
    }


}






export const FORMATS = {
    parse: {
        dateInput: 'DD/MM/YYYY',
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};

export function dateAdapterFactory() {
    const lang = window.sessionStorage.getItem('saLang');
    return new MomentDateAdapter(lang as string);
}
