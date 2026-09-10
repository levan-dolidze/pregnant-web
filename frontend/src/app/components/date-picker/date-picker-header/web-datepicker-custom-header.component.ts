import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Inject,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MatDateFormats,
} from '@angular/material/core';
import { MatCalendar, MatDatepicker } from '@angular/material/datepicker';
import { DatePickerService } from '../../date-picker/service/date-picker-service';

@Component({
  selector: 'app-web-datepicker-custom-header',
  templateUrl: './web-datepicker-custom-header.component.html',
  styleUrls: ['./web-datepicker-custom-header.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebDatepickerCustomHeaderComponent<D> {
  showTodayButton: boolean = false;
  constructor(
    private readonly calendar: MatCalendar<D>,
    private readonly dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private readonly dateFormats: MatDateFormats
  ) {
  }


  get periodLabel() {
    return this.dateAdapter
      .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    let isYearView = this.calendar.currentView == 'multi-year' ? -24 : -1;
    this.calendar.activeDate =
      mode === 'month'
        ? this.dateAdapter.addCalendarMonths(this.calendar.activeDate, -1)
        : this.dateAdapter.addCalendarYears(
          this.calendar.activeDate,
          isYearView
        );
  }

  nextClicked(mode: 'month' | 'year') {
    let isYearView = this.calendar.currentView == 'multi-year' ? 24 : 1;
    this.calendar.activeDate =
      mode === 'month'
        ? this.dateAdapter.addCalendarMonths(this.calendar.activeDate, 1)
        : this.dateAdapter.addCalendarYears(
          this.calendar.activeDate,
          isYearView
        );
  }

  periodChange() {
    this.calendar.currentView = 'multi-year';
  }


  genPreviousIcon(): string {
    if (!this.calendar.minDate) {
      return 'var(--picker-arrow-left)'
    }

    const prevMonth = this.dateAdapter.addCalendarMonths(
      this.calendar.activeDate,
      -1
    );

    return prevMonth < this.calendar.minDate
      ? 'var(--picker-arrow-left-inactive)'
      : 'var(--picker-arrow-left)';
  }

  genNextIcon(): string {
    if (!this.calendar.maxDate) {
      return 'var(--picker-arrow-right)'
    }

    const nextMonth = this.dateAdapter.addCalendarMonths(
      this.calendar.activeDate,
      1
    );

    return nextMonth > this.calendar.maxDate
      ? 'var(--picker-arrow-right-inactive)'
      : 'var(--picker-arrow-right)';
  }

  @ViewChild('inputElement', { read: ElementRef }) inputElement!: ElementRef;


  datePickerService = inject(DatePickerService)
  private activeTooltip: HTMLElement | null = null;


}
