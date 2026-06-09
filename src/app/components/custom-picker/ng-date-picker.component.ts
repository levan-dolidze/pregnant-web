export interface SelectedRangeData {
  input?: HTMLInputElement;
  selectedDates?: DateRange<moment.Moment> | any
  actions: Actions,
  isClear?: boolean,
  keys?: string[]
}

export enum ActiveBtnIndex {
  Period,
  Start,
  End,
}

export interface Actions {
  className: string;
  text: string;
  type: string;
  index: number;
  label: string;
  keyFrom: string;
  keyTo: string;
}

import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
  ViewChild,

} from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateRange } from '@angular/material/datepicker';
import { DEFAULT_DATE_OPTION_ENUM } from './constant/date-filter-enum';
import { DEFAULT_DATE_OPTIONS } from './data/default-date-options';
import { ISelectDateOption } from './model/select-date-option';
import { CalendarComponent } from './calendar/calendar.component';
import { SelectedDateEvent } from './model/date-selection-event-data';
import { OverlayModule } from '@angular/cdk/overlay';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { SharedModule } from 'src/app/shared/shared-module/shared';


@Component({
  selector: 'lib-date-range-picker',
  templateUrl: './ng-date-picker.component.html',
  styleUrls: ['./ng-date-picker.component.scss'],
  imports: [SharedModule, CalendarComponent, OverlayModule],
})
export class NgDatePickerComponent implements OnInit, OnChanges, AfterViewInit {

  private readonly cdref = inject(ChangeDetectorRef)
  private readonly el = inject(ElementRef)

  @ViewChild('inputElementFrom') inputElementFrom!: any;
  @ViewChild('inputElementTo') inputElementTo!: any;

  @Input() inputLabel: string = 'პერიოდი';
  @Input() enableDefaultOptions: boolean = true;
  @Input() selectedDates!: DateRange<Date> | null;
  @Input() dateFormat: string = 'dd/MM/yyyy';
  @Input() isShowStaticDefaultOptions: boolean = false;
  @Input() hideDefaultOptions: boolean = false;
  @Input() cdkConnectedOverlayOffsetX = 0;
  @Input() cdkConnectedOverlayOffsetY = 0;
  @Input() listCdkConnectedOverlayOffsetY = 0;
  @Input() listCdkConnectedOverlayOffsetX = 0;
  @Input() selectedOptionIndex = 3;
  @Input() displaySelectedLabel = false;
  @Input() cdkConnectedOverlayPush = true;
  @Input() controlStart!: AbstractControl;
  @Input() controlEnd!: AbstractControl;
  @Input() cdkConnectedOverlayPositions = [];

  @Input() start!: Date | string;
  @Input() end!: Date | string


  @Input() minDate: Date = new Date(Date.UTC(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  ));
  // default max date is current date - 1 years.
  @Input() maxDate: Date = new Date(Date.UTC(
    new Date().getFullYear() + 1,
    new Date().getMonth(),
    new Date().getDate() - 1,
    23, 59, 59
  ));
  @Input()
  set dateDropDownOptions(defaultDateList: ISelectDateOption[]) {
    if (this.enableDefaultOptions) {
      this._dateDropDownOptions =
        this.getClone<ISelectDateOption[]>(DEFAULT_DATE_OPTIONS).concat(
          defaultDateList
        );
    } else {
      this._dateDropDownOptions = defaultDateList;
    }
  }

  @Input() defaultFilterActions = [0, 1, 2]

  get dateDropDownOptions(): ISelectDateOption[] {
    return this._dateDropDownOptions ?? [];
  }

  @Input() activeBtnIndex: number = 0;
  @Input() key!: string;

  @Output() activeBtnModeEmit: EventEmitter<any> = new EventEmitter();
  @Output() rangeFilterEmit: EventEmitter<SelectedRangeData> =
    new EventEmitter();

  @Output() dateSelectionChanged: EventEmitter<any>;
  @Output() dateListOptions: EventEmitter<ISelectDateOption[]>;
  private _dateDropDownOptions: ISelectDateOption[] = [];

  isDateOptionList: boolean = false;
  isCustomRange: boolean = false;


  form = new FormGroup({
    from: new FormControl(),
    to: new FormControl(),
  })


  constructor() {
    this.dateSelectionChanged = new EventEmitter<SelectedDateEvent>();
    this.dateListOptions = new EventEmitter<ISelectDateOption[]>();
  }



  actionBtns = signal<Actions[]>([
    {
      className: 'mini-vh-32-100-r',
      text: 'პერიოდი',
      type: 'period',
      label: 'პერიოდი',
      index: 0,
      keyFrom: '',
      keyTo: '',
    },
    {
      className: 'mini-vh-32-100-r',
      text: 'დასაწყისი',
      type: 'start',
      label: 'დასაწყისი',
      index: 1,
      keyFrom: '',
      keyTo: '',
    },
    {
      className: 'mini-vh-32-100-r',
      text: 'დასასრული',
      type: 'end',
      label: 'დასასრული',
      index: 2,
      keyFrom: '',
      keyTo: '',
    },
  ]);
  actionBtnsState = computed(() => this.actionBtns());


  dateInput: any

  get f() {
    return this.form.controls
  }


  ngOnInit(): void {

    if (!this._dateDropDownOptions.length && this.enableDefaultOptions) {
      this._dateDropDownOptions =
        this.getClone<ISelectDateOption[]>(DEFAULT_DATE_OPTIONS);
      if (this._dateDropDownOptions[this.selectedOptionIndex]) {
        this._dateDropDownOptions[this.selectedOptionIndex].isSelected = true;
      }
    }
    this.dateListOptions.emit(this.dateDropDownOptions);
    this.activeBtnModeEmit.emit(this.actionBtnsState()[0]);
  }



  onDateSelect(e: any) {
    console.log(e)
  }

  onModeSelect(actions: Actions) {
    this.activeBtnIndex = this.actionBtnsState().findIndex(
      (btn) => btn.type === actions.type
    );
    this.activeBtnModeEmit.emit(this.actionBtnsState()[this.activeBtnIndex]);
    this.inputLabel = actions.label;
  }

  ngAfterViewInit(): void {
    this.updateDefaultDatesValues();
    this.form.patchValue({
      from: this.start,
      to: this.end
    })
  }

  oninsuredTriggerChanged(e: unknown) {
    if (!this.inputElementFrom) return;

    if (this.f.from.value && this.f.to.value) {

      const range = new DateRange<moment.Moment>(
        moment(new Date(this.f.from.value)),
        moment(new Date(this.f.to.value))
      );

      this.updateCustomRange(this.inputElementFrom.inputElement, range)
      // this.form.patchValue({
      //   from: new Date(this.f.from.value) ,
      //   to: new Date(this.f.to.value),
      // })
    }
  }


  toggleDateOptionSelectionList(event?: any): void {
    this.dateInput = event
    this.toggleCustomDateRangeView();
  }

  /**
   *
   * @param input HTMLInputElement
   * @param selectedDates DateRange<Date>
   * 
   * 
   * 
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.inputElementFrom) return;

    if ((changes && changes['start']) || (changes && changes['end'])) {
      const start = changes['start']?.currentValue
      const end = changes['end']?.currentValue

      if (!this.start && !this.end) {
        this.form.patchValue({
          to: null,
          from: null
        })
        this.clearSelection()
        return;
      }
      const range = new DateRange<moment.Moment>(
        moment(start),
        moment(end)
      );

      this.updateCustomRange(this.inputElementFrom.inputElement, range)
      this.form.patchValue({
        from: start,
        to: end,
      })
    }
  }

  updateCustomRange(input: HTMLInputElement, selectedDates: DateRange<Date | any> | null): void {

    this.updateSelectedDates(input, selectedDates?.start ?? new Date(), selectedDates?.end ?? new Date(), null);

    if (this.isCustomRange) {
      this.resetOptionSelection();
      this.selectCustomOption();
      this.isCustomRange = false;
      this.rangeFilterEmit.emit({
        input: input,
        selectedDates: selectedDates,
        actions: this.actionBtnsState()[this.activeBtnIndex]
      });

      this.form.patchValue({
        from: selectedDates?.start,
        to: selectedDates?.end,
      })
    }
    this.cdref.markForCheck()
  }

  /**
   *
   * @param option ISelectDateOption
   * @param input HTMLInputElement
   */
  updateSelection(option: ISelectDateOption, input: HTMLInputElement): void {
    this.isDateOptionList = false;
    if (option.optionKey !== DEFAULT_DATE_OPTION_ENUM.CUSTOM) {
      this.isCustomRange = false;
      this.resetOptionSelection(option);
      this.updateDateOnOptionSelect(option, input);
    } else {
      this.isCustomRange = true;
    }
    this.cdref.markForCheck();
  }

  selectCustomOption(): void {
    const customOption = this.dateDropDownOptions.filter(
      (option) => option.optionKey === DEFAULT_DATE_OPTION_ENUM.CUSTOM
    );
    customOption[0].isSelected = true;
  }

  toggleCustomDateRangeView(): void {
    this.isCustomRange = !this.isCustomRange;
  }


  clearSelection(event?: MouseEvent): void {
    event?.stopImmediatePropagation();
    this.selectedDates = null;
    this.resetOptionSelection();

    const dateInputField =
      this.el.nativeElement.querySelector('#date-input-field');
    if (dateInputField) {
      dateInputField.value = '';
    }
    const selectedDateEventData: SelectedDateEvent = {
      range: null,
      selectedOption: null,
    };
    this.dateSelectionChanged.emit(selectedDateEventData);

    const [fromKeys, toKeys] = [this.actionBtnsState().map(btn => btn.keyFrom), this.actionBtnsState().map(btn => btn.keyTo)];

    this.rangeFilterEmit.emit({
      isClear: true,
      keys: fromKeys.concat(toKeys),
      actions: this.actionBtnsState()[this.activeBtnIndex]
    });

    this.form.patchValue({
      from: null,
      to: null
    })

    this.cdref.markForCheck();

  }

  /**
   * This method sets clicked element as selected.
   * @param option ISelectDateOption
   */
  private resetOptionSelection(option?: ISelectDateOption): void {
    this.dateDropDownOptions.forEach((option) => (option.isSelected = false));
    if (option) {
      option.isSelected = true;
    }
    this.cdref.markForCheck();
  }

  /**
   *
   * @param option - The date option selected by the user.
   * @param input - The HTML input element to update.
   */
  private updateDateOnOptionSelect(
    option: ISelectDateOption,
    input: HTMLInputElement
  ): void {
    const currDate = new Date();
    let startDate: Date = new Date();
    let lastDate: Date = new Date();

    if (option.callBackFunction) {
      const dateRange: DateRange<Date> = option.callBackFunction();
      if (dateRange?.start && dateRange?.end) {
        this.updateSelectedDates(input, dateRange.start, dateRange.end, option);
        return;
      }
    }

    switch (option.optionKey) {
      case DEFAULT_DATE_OPTION_ENUM.DATE_DIFF:
        startDate.setDate(startDate.getDate() + option.dateDiff);
        break;

      case DEFAULT_DATE_OPTION_ENUM.LAST_MONTH:
        currDate.setMonth(currDate.getMonth() - 1);
        startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
        lastDate = new Date(
          currDate.getFullYear(),
          currDate.getMonth(),
          this.getDaysInMonth(currDate)
        );
        break;

      case DEFAULT_DATE_OPTION_ENUM.THIS_MONTH:
        startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
        lastDate = new Date(
          currDate.getFullYear(),
          currDate.getMonth(),
          this.getDaysInMonth(currDate)
        );
        break;

      case DEFAULT_DATE_OPTION_ENUM.YEAR_TO_DATE:
        startDate = new Date(currDate.getFullYear(), 0, 1);
        break;

      case DEFAULT_DATE_OPTION_ENUM.MONTH_TO_DATE:
        startDate = new Date(currDate.getFullYear(), currDate.getMonth(), 1);
        break;

      default:
        break;
    }
    this.updateSelectedDates(input, startDate, lastDate, option);
  }

  /**
   * @param input HTMLInputElement
   * @param startDate Date
   * @param endDate Date
   */
  private updateSelectedDates(
    input: HTMLInputElement,
    startDate: Date,
    endDate: Date,
    option: ISelectDateOption | null
  ): void {

    this.selectedDates = new DateRange<Date>(startDate, endDate);
    input.value =
      this.displaySelectedLabel && option
        ? option.optionLabel
        : this.getDateString(startDate) + ' - ' + this.getDateString(endDate);
    const selectedOption = this.dateDropDownOptions.filter(
      (option) => option.isSelected
    )[0];
    const selectedDateEventData: SelectedDateEvent = {
      range: new DateRange<Date>(new Date(startDate), new Date(endDate)),
      selectedOption: selectedOption,
    };
    this.dateSelectionChanged.emit(selectedDateEventData);
    this.cdref.markForCheck();
  }

  /**
   * This method converts the given date into specified string format.
   *
   * @param date Date
   * @returns formatted date.
   */
  private getDateString(date: Date): string {
    const datePipe = new DatePipe('en');
    return datePipe.transform(date, this.dateFormat) ?? '';
  }

  /**
   * This method return the number of days in moth on specified date.
   *
   * @param date Date
   * @returns number
   */
  private getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  /**
   * @param data T
   * @returns T
   */
  private getClone<T>(data: T): T {
    return JSON.parse(JSON.stringify(data));
  }

  private updateDefaultDatesValues(): void {
    const input: HTMLInputElement =
      this.el.nativeElement.querySelector('#date-input-field');
    if (
      this.selectedDates?.start &&
      this.selectedDates?.end
    ) {
      const customOption: ISelectDateOption[] =
        this._dateDropDownOptions.filter(
          (option) => option.optionKey === DEFAULT_DATE_OPTION_ENUM.CUSTOM
        );
      customOption[0].isSelected = true;
      input.value =
        this.getDateString(this.selectedDates.start) +
        ' - ' +
        this.getDateString(this.selectedDates.end);
    } else {
      const selectedOptions: ISelectDateOption[] =
        this._dateDropDownOptions.filter((option) => option.isSelected);
      if (
        selectedOptions.length &&
        selectedOptions[0].optionKey !== DEFAULT_DATE_OPTION_ENUM.CUSTOM
      ) {
        this.updatedFromListValueSelection(selectedOptions[0], input);
      }
    }
    this.cdref.detectChanges();
  }

  /**
   * @param selectedOption ISelectDateOption
   * @param input HTMLInputElement
   */
  private updatedFromListValueSelection(
    selectedOption: ISelectDateOption,
    input: HTMLInputElement
  ): void {
    if (selectedOption['callBackFunction']) {
      const dateRange: DateRange<Date> = selectedOption.callBackFunction();
      if (dateRange?.start && dateRange?.end) {
        this.updateSelectedDates(
          input,
          dateRange.start,
          dateRange.end,
          selectedOption
        );
      }
    } else {
      this.updateDateOnOptionSelect(selectedOption, input);
    }
  }
}
