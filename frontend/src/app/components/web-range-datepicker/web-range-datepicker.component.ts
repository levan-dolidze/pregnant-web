import { Component, DestroyRef, effect, EventEmitter, forwardRef, Inject, inject, Input, OnInit, Output, signal, Signal, } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import moment from 'moment';
import { MAT_DATE_RANGE_SELECTION_STRATEGY, MatDatepickerModule, MatDateRangeInput, MatDateRangePicker } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { dateAdapterFactory, FourteenDaySelectionStrategy } from './web-range-picker-helper';
import { FORMATS } from './web-range-picker-helper'
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { CustomDateAdapter } from '../custom-picker/custom-filter-picker-adapter';
import { Languages } from 'src/app/shared/translate/translation.serive';
import { WebDatepickerCustomHeaderComponent } from '../date-picker/date-picker-header/web-datepicker-custom-header.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-web-range-datepicker',
  templateUrl: './web-range-datepicker.component.html',
  styleUrls: ['./web-range-datepicker.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, MatFormField, NgClass, MatLabel, MatDateRangeInput, MatDateRangePicker, MatDatepickerModule,
MatInputModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WebRangeDatepickerComponent),
      multi: true,
    },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: window.sessionStorage.getItem('saLang') ?? 'ka' },
    { provide: MAT_DATE_FORMATS, useValue: { ...FORMATS } },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
    {
      provide: DateAdapter,
      useFactory: dateAdapterFactory,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass: FourteenDaySelectionStrategy,
    },
  ],
})
export class WebRangeDatepickerComponent implements OnInit, ControlValueAccessor {



  @Input() placeholderStart: string;
  @Input() placeholderEnd: string;
  @Input() date: string | Date
  @Input() end: string | Date
  @Input() min: Date | string
  @Input() max: Date;
  @Input() defaultDate: Date;
  @Input() isDisabled: boolean = false;
  @Input() isReadonly: boolean = true;
  @Input() submitButtonClicked: string = '';
  @Input() dayRange: number
  @Input() className: string = '';
  @Input() rgState = signal<boolean>(false);


  @Input() startControl: AbstractControl | null
  @Input() endControl: AbstractControl | null

  @Output() changeDate: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeDateEnd: EventEmitter<any> = new EventEmitter<any>();

  readonly isStrategy: boolean = true
  readonly destroyRef = inject(DestroyRef)



  constructor(@Inject(MAT_DATE_RANGE_SELECTION_STRATEGY)
  private readonly rg: FourteenDaySelectionStrategy<any>,
    private readonly ssService: SessionStorageService
  ) {
    this.lang = this.ssService.getKey('saLang');
    effect(() => {
      this.customStrategyToggle()
    })
  }

  lang: Languages;

  customCalendarHeader = WebDatepickerCustomHeaderComponent;

  readonly fb = inject(FormBuilder)
  isPickerOpened: boolean = false;



  onChange: (value: { date: Date, dateEnd: Date }) => void = () => { };
  onTouch: () => void = () => { };


  value: string | Date
  endValue: string | Date
  inValid: boolean = false;


  icon: string;
  form: FormGroup


  ngOnInit(): void {

    this.initForm()

    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        this.onChange(value);
      });


  };



  get customRange() {
    return this.rg.off;
  }
  set customRange(value) {
    this.rg.off = value;
  }



  get dateFormControl(): AbstractControl {
    return this.form.controls['date'];
  }
  get dateFormControlEnd(): AbstractControl {
    return this.form.controls['dateEnd'];
  }



  private initForm() {
    this.form = this.fb.group({
      date: [this.date],
      dateEnd: [this.end]
    });
  };



  private customStrategyToggle() {
    if (this.isStrategy) {
      this.rg.rangeDays = this.dayRange
      console.log(this.dayRange)
      this.rg.off = !this.rgState()
    }
    return
  };



  setStartAndEndValues(startDate: Date, endDate: Date) {
    this.form.patchValue({
      date: startDate,
      dateEnd: endDate
    });
  };


  removeStartAndEndValues() {
    this.form.patchValue({
      date: null,
      dateEnd: null
    });
  }

  writeValue(value: { date: Date, dateEnd: Date }): void {
    this.form.patchValue({
      date: value.date,
      dateEnd: value.dateEnd
    });
  }


  registerOnChange(fn: (value: { date: Date, dateEnd: Date }) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }


  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  };

  open(picker: any) {
    picker.open()
  }



  dateChanged(): void {
    // this.checkIsValid()

    if (this.dateFormControl.value) {
      this.changeDate.emit(moment(this.dateFormControl.value).format())
    }
    if (this.dateFormControlEnd?.value) {
      this.changeDateEnd.emit(moment(this.dateFormControlEnd?.value).format())
    }
  }


  destroy$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  };

};
