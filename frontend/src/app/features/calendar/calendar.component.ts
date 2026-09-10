import {
  AfterViewInit, ChangeDetectionStrategy, Component,
  ElementRef, ViewChild, inject, signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

import { CalEvent, BookingForm, CalendarService, ViewMode } from './calendar.service';
import { DatePicker } from '../../components/date-picker/date-picker';

const DEFAULT_COLOR = '#039BE5';
const DAY_LABEL_KEYS = [
  'Day_Short_Sun', 'Day_Short_Mon', 'Day_Short_Tue', 'Day_Short_Wed',
  'Day_Short_Thu', 'Day_Short_Fri', 'Day_Short_Sat',
];
const HOURS         = Array.from({ length: 24 }, (_, i) => i);

@Component({
  selector: 'app-calendar',
  imports: [FormsModule, DatePicker, MatDatepickerModule, MatNativeDateModule, TranslocoModule],
  providers: [CalendarService, { provide: MAT_DATE_LOCALE, useValue: 'ka-GE' }],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements AfterViewInit {
  @ViewChild('gridWrap') private readonly gridWrapRef!: ElementRef<HTMLElement>;

  private readonly translocoService = inject(TranslocoService);

  readonly cal          = inject(CalendarService);
  readonly hours        = HOURS;
  readonly dayLabelKeys = DAY_LABEL_KEYS;

  // ── UI state ─────────────────────────────────────────────────
  readonly showCreateMenu    = signal(false);
  readonly showBookModal     = signal(false);
  readonly showEventPopup    = signal<CalEvent | null>(null);
  readonly showMyCalendars   = signal(true);
  readonly showBookingPages  = signal(true);
  readonly showMeetSection   = signal(true);
  readonly showMobileSidebar = signal(false);
  readonly editingEventId    = signal<string | null>(null);
  readonly formError         = signal<string | null>(null);

  toggleMobileSidebar(): void {
    this.showMobileSidebar.update(v => !v);
  }

  form: BookingForm = this.defaultForm();

  // ── Lifecycle ────────────────────────────────────────────────
  ngAfterViewInit(): void {
    const now = new Date();
    const scrollTop = (now.getHours() + now.getMinutes() / 60) * 60 - 120;
    setTimeout(() => this.gridWrapRef?.nativeElement?.scrollTo({ top: Math.max(0, scrollTop) }));
  }

  // ── Grid helpers ─────────────────────────────────────────────
  visibleDays(): Date[] {
    return this.cal.viewMode() === 'week'
      ? this.cal.weekDays()
      : [this.cal.currentDate()];
  }

  setViewMode(mode: ViewMode): void {
    this.cal.viewMode.set(mode);
  }

  // ── Booking ──────────────────────────────────────────────────
  openBookingModal(day?: Date, hour = 9): void {
    const date = day ? new Date(day) : new Date(this.cal.currentDate());
    const pad  = (n: number) => String(n).padStart(2, '0');
    this.form  = {
      title:     'ვიზიტი Dr. თამარ თევზაძე',
      date:      this.cal.toInputDate(date),
      startTime: `${pad(hour)}:00`,
      endTime:   `${pad(Math.min(hour + 1, 23))}:00`,
      color:     DEFAULT_COLOR,
      hasMeet:   false,
      notes:     '',
    };
    this.showCreateMenu.set(false);
    this.showEventPopup.set(null);
    this.showBookModal.set(true);
  }

  openBookingModalWithMeet(): void {
    this.openBookingModal();
    this.form.hasMeet = true;
  }

  openEditModal(ev: CalEvent): void {
    const pad = (n: number) => String(n).padStart(2, '0');
    this.form = {
      title:     ev.title,
      date:      this.cal.toInputDate(ev.start),
      startTime: `${pad(ev.start.getHours())}:${pad(ev.start.getMinutes())}`,
      endTime:   `${pad(ev.end.getHours())}:${pad(ev.end.getMinutes())}`,
      color:     ev.color,
      hasMeet:   ev.hasMeet,
      notes:     ev.notes ?? '',
    };
    this.editingEventId.set(ev.id);
    this.showEventPopup.set(null);
    this.showBookModal.set(true);
  }

  saveBooking(): void {
    if (!this.form.title.trim()) {
      this.formError.set(this.translocoService.translate('Title_Required'));
      return;
    }
    if (this.form.startTime >= this.form.endTime) {
      this.formError.set(this.translocoService.translate('End_Time_After_Start_Time'));
      return;
    }
    this.formError.set(null);

    const editId = this.editingEventId();
    if (editId) {
      this.cal.updateBooking(editId, this.form);
    } else {
      this.cal.saveBooking(this.form);
    }

    this.closeBookingModal();
  }

  deleteEvent(ev: CalEvent): void {
    this.cal.deleteEvent(ev);
    this.showEventPopup.set(null);
  }

  closeEventPopup(): void    { this.showEventPopup.set(null); }
  closeBookingModal(): void {
    this.showBookModal.set(false);
    this.editingEventId.set(null);
    this.formError.set(null);
  }

  // ── Form helpers ─────────────────────────────────────────────
  onDatePickerChange(value: string | null): void {
    if (value) this.form.date = value.split('T')[0];
  }

  toggleMeet(): void {
    this.form.hasMeet = !this.form.hasMeet;
  }

  onMiniCalSelect(date: Date | null): void {
    if (date) this.cal.selectMiniDay(date);
  }

  private defaultForm(): BookingForm {
    return {
      title:     'ვიზიტი Dr. თამარ თევზაძე',
      date:      '',
      startTime: '09:00',
      endTime:   '10:00',
      color:     DEFAULT_COLOR,
      hasMeet:   false,
      notes:     '',
    };
  }
}
