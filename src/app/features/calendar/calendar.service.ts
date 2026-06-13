import { Injectable, OnDestroy, computed, signal, effect } from '@angular/core';

export interface CalEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  hasMeet: boolean;
  meetLink?: string;
  notes?: string;
}

export interface CalEventLayout {
  ev: CalEvent;
  column: number;
  totalColumns: number;
}

export interface BookingForm {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  color: string;
  hasMeet: boolean;
  notes: string;
}

export type ViewMode = 'day' | 'week';

@Injectable()
export class CalendarService implements OnDestroy {
  private readonly STORAGE_KEY = 'cal-events-v1';

  private readonly timeInterval = setInterval(
    () => this.currentTime.set(new Date()),
    30_000,
  );

  // ── State ────────────────────────────────────────────────────
  readonly today = new Date();
  readonly currentDate = signal(new Date());
  readonly viewMode = signal<ViewMode>('day');
  readonly miniCalDate = signal(new Date());
  readonly currentTime = signal(new Date());
  readonly events = signal<CalEvent[]>(this.loadEvents());

  constructor() {
    effect(() => this.saveEvents(this.events()));
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
  }

  // ── Computed ─────────────────────────────────────────────────
  readonly weekDays = computed(() => {
    const date = this.currentDate();
    const sunday = new Date(date);
    sunday.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(sunday);
      d.setDate(sunday.getDate() + i);
      return d;
    });
  });

  readonly miniCalDays = computed(() => {
    const ref = this.miniCalDate();
    const year = ref.getFullYear();
    const month = ref.getMonth();
    const firstDow = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const cells: Date[] = [];
    for (let i = 0; i < firstDow; i++) {
      cells.push(new Date(year, month, i - firstDow + 1));
    }
    for (let d = 1; d <= lastDate; d++) {
      cells.push(new Date(year, month, d));
    }
    const rem = 42 - cells.length;
    for (let i = 1; i <= rem; i++) {
      cells.push(new Date(year, month + 1, i));
    }
    return cells;
  });

  readonly miniCalTitle = computed(() =>
    this.miniCalDate().toLocaleDateString('ka-GE', { month: 'long', year: 'numeric' }),
  );

  readonly weekTitle = computed(() => {
    const days = this.weekDays();
    const first = days[0];
    const last = days[6];
    if (first.getMonth() === last.getMonth()) {
      return first.toLocaleDateString('ka-GE', { month: 'long', year: 'numeric' });
    }
    return `${first.toLocaleDateString('ka-GE', { month: 'short' })} – ${last.toLocaleDateString('ka-GE', { month: 'long', year: 'numeric' })}`;
  });

  readonly dayTitle = computed(() =>
    this.currentDate().toLocaleDateString('ka-GE', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    }),
  );

  readonly currentTimeTop = computed(() => {
    const now = this.currentTime();
    return `${(now.getHours() + now.getMinutes() / 60) * 60}px`;
  });

  // ── Helpers ──────────────────────────────────────────────────
  isToday(d: Date): boolean {
    return this.sameDay(d, this.today);
  }

  sameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate();
  }

  inCurrentMonth(d: Date): boolean {
    const ref = this.miniCalDate();
    return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear();
  }

  // ── Overlap layout ───────────────────────────────────────────
  eventsForDayWithLayout(day: Date): CalEventLayout[] {
    const dayEvents = this.events()
      .filter(e => this.sameDay(e.start, day))
      .sort((a, b) => a.start.getTime() - b.start.getTime() || b.end.getTime() - a.end.getTime());

    const layouts: CalEventLayout[] = dayEvents.map(ev => ({ ev, column: 0, totalColumns: 1 }));

    for (let i = 0; i < layouts.length; i++) {
      const used = new Set<number>();
      for (let j = 0; j < i; j++) {
        if (this.overlaps(layouts[i].ev, layouts[j].ev)) used.add(layouts[j].column);
      }
      let col = 0;
      while (used.has(col)) col++;
      layouts[i].column = col;
    }

    for (let i = 0; i < layouts.length; i++) {
      let maxCol = layouts[i].column;
      for (let j = 0; j < layouts.length; j++) {
        if (i !== j && this.overlaps(layouts[i].ev, layouts[j].ev)) {
          maxCol = Math.max(maxCol, layouts[j].column);
        }
      }
      layouts[i].totalColumns = maxCol + 1;
    }

    return layouts;
  }

  private overlaps(a: CalEvent, b: CalEvent): boolean {
    return a.start < b.end && b.start < a.end;
  }

  // ── Formatters ───────────────────────────────────────────────
  eventTop(ev: CalEvent): string {
    return `${(ev.start.getHours() + ev.start.getMinutes() / 60) * 60}px`;
  }

  eventHeight(ev: CalEvent): string {
    const mins = (ev.end.getTime() - ev.start.getTime()) / 60_000;
    return `${Math.max(mins, 30)}px`;
  }

  eventLeft(l: CalEventLayout): string {
    return `calc(${(l.column / l.totalColumns * 100).toFixed(1)}% + 2px)`;
  }

  eventWidth(l: CalEventLayout): string {
    return `calc(${(100 / l.totalColumns).toFixed(1)}% - 4px)`;
  }

  formatHour(h: number): string {
    if (h === 0) return '';
    return `${h}:00`;
  }

  formatTime(d: Date): string {
    return d.toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit', hour12: false });
  }

  formatShortDate(d: Date): string {
    return d.toLocaleDateString('ka-GE', { month: 'short', day: 'numeric' });
  }

  toInputDate(d: Date): string {
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${mm}-${dd}`;
  }

  // ── Navigation ───────────────────────────────────────────────
  shiftPeriod(dir: 1 | -1): void {
    const d = new Date(this.currentDate());
    d.setDate(d.getDate() + dir * (this.viewMode() === 'week' ? 7 : 1));
    this.currentDate.set(d);
  }

  goToday(): void { this.currentDate.set(new Date()); this.miniCalDate.set(new Date()); }

  shiftMiniMonth(dir: 1 | -1): void {
    const d = new Date(this.miniCalDate());
    d.setMonth(d.getMonth() + dir);
    this.miniCalDate.set(d);
  }

  selectMiniDay(d: Date): void {
    this.currentDate.set(new Date(d));
    if (!this.inCurrentMonth(d)) this.miniCalDate.set(new Date(d));
  }

  // ── Persistence ──────────────────────────────────────────────
  private loadEvents(): CalEvent[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        return (JSON.parse(raw) as Array<CalEvent & { start: string; end: string }>)
          .map(e => ({ ...e, start: new Date(e.start), end: new Date(e.end) }));
      }
    } catch { /* storage unavailable */ }
    return this.buildDemoEvents();
  }

  private saveEvents(events: CalEvent[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(events));
    } catch { /* storage unavailable */ }
  }

  // ── Demo data ────────────────────────────────────────────────
  private buildDemoEvents(): CalEvent[] {
    const at = (dayOffset: number, h: number, m = 0) => {
      const d = new Date();
      d.setDate(d.getDate() + dayOffset);
      d.setHours(h, m, 0, 0);
      return d;
    };

    return [
      { id: crypto.randomUUID(), title: 'ვიზიტი — ნინო კვარაცხელია', start: at(0, 9), end: at(0, 10), color: '#039BE5', hasMeet: false },
      { id: crypto.randomUUID(), title: 'ვიდეო კონსულტაცია — მარიამ ც.', start: at(0, 9, 30), end: at(0, 11), color: '#039BE5', hasMeet: true, meetLink: 'https://meet.example.com/abc-123', notes: 'მე-2 ტრიმესტრი, კითხვები UGT-ზე' },
      { id: crypto.randomUUID(), title: 'ვიზიტი — თამარ ჯ.', start: at(0, 14), end: at(0, 15), color: '#039BE5', hasMeet: false },
      { id: crypto.randomUUID(), title: 'ვიზიტი — ანა ბ.', start: at(1, 10), end: at(1, 11), color: '#039BE5', hasMeet: false, notes: 'პირველი ვიზიტი' },
      { id: crypto.randomUUID(), title: 'ვიზიტი — სალომე მ.', start: at(1, 13), end: at(1, 14), color: '#039BE5', hasMeet: false },
      { id: crypto.randomUUID(), title: 'ვიდეო კონსულტაცია — ლელა გ.', start: at(2, 10), end: at(2, 10, 30), color: '#039BE5', hasMeet: true, meetLink: 'https://meet.example.com/def-456' },
      { id: crypto.randomUUID(), title: 'ვიზიტი — ქეთი ა.', start: at(2, 15, 30), end: at(2, 16, 30), color: '#039BE5', hasMeet: false },
      { id: crypto.randomUUID(), title: 'ვიზიტი — მარინე დ.', start: at(3, 9, 30), end: at(3, 10, 30), color: '#039BE5', hasMeet: false },
      { id: crypto.randomUUID(), title: 'ვიდეო კონსულტაცია', start: at(3, 16), end: at(3, 16, 30), color: '#039BE5', hasMeet: true, meetLink: 'https://meet.example.com/ghi-789' },
    ];
  }

  // ── CRUD ─────────────────────────────────────────────────────
  saveBooking(form: BookingForm): void {
    const { start, end } = this.parseDates(form);
    this.events.update(evs => [...evs, {
      id: crypto.randomUUID(), title: form.title, start, end, color: form.color,
      hasMeet: form.hasMeet,
      meetLink: form.hasMeet ? `https://meet.example.com/${crypto.randomUUID().slice(0, 8)}` : undefined,
      notes: form.notes || undefined,
    }]);
  }

  updateBooking(id: string, form: BookingForm): void {
    const { start, end } = this.parseDates(form);
    this.events.update(evs => evs.map(ev => ev.id === id ? {
      ...ev, title: form.title, start, end, color: form.color, hasMeet: form.hasMeet,
      meetLink: form.hasMeet ? (ev.meetLink ?? `https://meet.example.com/${crypto.randomUUID().slice(0, 8)}`) : undefined,
      notes: form.notes || undefined,
    } : ev));
  }

  private parseDates(form: BookingForm): { start: Date; end: Date } {
    const [y, mo, d] = form.date.split('-').map(Number);
    const [sh, sm]   = form.startTime.split(':').map(Number);
    const [eh, em]   = form.endTime.split(':').map(Number);
    return { start: new Date(y, mo - 1, d, sh, sm), end: new Date(y, mo - 1, d, eh, em) };
  }

  deleteEvent(ev: CalEvent): void {
    this.events.update(evs => evs.filter(e => e.id !== ev.id));
  }
}
