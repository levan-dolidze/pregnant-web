import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  computed,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MAT_DATE_FORMATS
} from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { FORMATS, dateAdapterFactory } from './custom-datepicker-helper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgClass, NgStyle } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import moment from 'moment';
import { CustomDateAdapter } from './adapter/custom-date-adapter';
import { AutoFormatDateDirective } from './directive/auto-format-date.directive';
import { TranslocoModule } from '@jsverse/transloco';
import { DatePickerService } from './service/date-picker-service';
import { WebDatepickerCustomHeaderComponent } from './date-picker-header/web-datepicker-custom-header.component';

export enum ValidDateEnum {
  ValidDateLength = 10
}

@Component({
  selector: 'lib-date-picker',
  imports: [
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    NgClass,
    AutoFormatDateDirective,
    TranslocoModule,
],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePicker),
      multi: true,
    },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'ka' },
    { provide: MAT_DATE_FORMATS, useValue: { ...FORMATS } },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } },
    {
      provide: DateAdapter,
      useFactory: dateAdapterFactory,
      deps: [MAT_DATE_LOCALE],
    },
  ],
})
export class DatePicker implements OnInit, OnChanges {
  @ViewChild(MatDatepicker) picker!: MatDatepicker<Date>;


  @Input() date: string | Date = '';
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() matDatePicker = false;
  @Input() min!: Date | string;
  @Input() max!: Date;
  @Input() isDisabled = false;
  @Input() isReadonly = false;
  @Input() removeDisableColor = false;
  @Input() defaultDate!: Date;
  @Input() isDefaultDate = false;
  @Input() isEditable = true;
  @Input() isRequired!: boolean;
  @Input() control!: any;
  @Input() isDoubleCalendarView: boolean = false
  @Input() isPickerIcon: boolean = true


  datePickerService = inject(DatePickerService)
  datePikerSignalState = this.datePickerService.datePikerSignalState
  @Output() changeDate: EventEmitter<any> = new EventEmitter<unknown>();
  @Output() openCalendarEmit: EventEmitter<unknown> = new EventEmitter<unknown>();
  @ViewChild('inputElement') inputElement!: ElementRef;
  customCalendarHeader = WebDatepickerCustomHeaderComponent;

  readonly destroyRef = inject(DestroyRef)
  readonly fb = inject(FormBuilder);

  form!: FormGroup
  value!: string | Date;

  onChange!: Function;
  onTouch!: Function;

  icon!: string;
  isOpen!: boolean;
  isFocus!: boolean;


  ngOnInit(): void {
    this.form = this.fb.group({
      date: [this.date],
    });
    this.disableField(this.isDisabled);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isDisabled']) {
      const newValue = changes['isDisabled'].currentValue;
      this.disableField(newValue);
    }
    if (this.inputElement) {
      this.openCalendarEmit.emit(this.inputElement)
    }
  }

  get dateFormControl(): AbstractControl {
    return this.form.controls['date'];
  }

  disableField(isDisabled: boolean) {
    console.log(isDisabled)
  }

  open(picker: any) {
    if ((!this.isEditable && this.isReadonly) || this.isDisabled) {
      return;
    }
    picker.open();
  }

  openPicker(): void {
    if (this.isDisabled || !this.isEditable) {
      return;
    }

    this.picker.open();
  }

  onToggleClick() {
    this.openCalendarEmit.emit(this.inputElement)
  }

  dateChanged(): void {
    this.changeDate.emit(moment(this.dateFormControl.value).format());
  }

  clearInput(): void {
    this.date = '';
    this.changeDate.emit('');
  }

  generateHint(): any {
    return this.inputElement?.nativeElement?.id;
  }

  removeDisableMode() {
    return {
      color: this.removeDisableColor ? 'var(--input-text)' : '',
    };
  }

  writeValue(value: Date): void {
    this.form.controls['date'].setValue(value);
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  datepickerOpened() {
    this.isOpen = true;
  }

  datepickerClosed() {
    this.isOpen = false;
  }


  private readonly inputValue = signal<string>('');
  readonly inputValueState = computed(this.inputValue);

  onInputChange(v: any) {
    this.inputValue.update((x) => (x = v));

    if (!this.inputElement?.nativeElement?.value) {
      this.changeDate.emit(null)
      return
    }
    else {
      const currentValue = this.inputElement?.nativeElement?.value;

      if (!currentValue) {
        this.changeDate.emit(null)
        return
      }
      else if (currentValue?.length === ValidDateEnum.ValidDateLength) {
        this.changeDate.emit(moment(this.dateFormControl.value).format());
        return
      }
    }
  }

  onBlur() {
    if (this.inputValueState() == null || this.inputValueState() == 'Invalid date') {
      this.inputValue.update(() => '-1')
    }
  }
  onFocus() {
    this.isFocus = true;
  }
}
