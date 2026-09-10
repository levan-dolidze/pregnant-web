import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-radio-button',
  imports: [NgClass, TranslocoModule, FormsModule, MatInputModule, MatRadioModule],
  templateUrl: './radio-button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
@use "variables" as *;
@use "mixins" as *;

.radio-container {
        background-color: var(--bg300);
        border-radius: 12px;
        margin:16px 0px;
  cursor: pointer;

  mat-radio-button {
    border: 1px solid var(--border);
    @include flex-init;
    border-radius: 12px;
    padding: 14px 21px;
    color: $primary;
    transition: 0.2s;
    width: 100%;
    ::ng-deep .mdc-form-field {
      width: 100%;
    }
    ::ng-deep label.mdc-label {
      width: 100%;
    }

    
    .radio-wrapper {
         display:flex;
      &__content{
        @include flex-center-between;
      }
      &__text > :nth-child(1) {
         @include font(14px, 700, var(--black-white), $font-bold);
      text-transform: capitalize;

}
&__text > :nth-child(2) {
    @include font(12px, 400,var(--label),$font-default);
}
&__right-text{
    @include font(14px, 500,$primary,$font-medium);
    white-space: nowrap;
}
  &__icon{
    width:24px;
    height:24px;
    }
    }
  }

  mat-radio-button.mat-mdc-radio-checked {
    border-color: $primary;
  }
      }

      .disabled{
        opacity: 0.5;
        cursor: initial;
      }

    `,
  ],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButton),
      multi: true,
    },
  ],
})
export class RadioButton implements OnChanges {
  @Input() isDisabled: any = false;
  @Input({ required: true }) data: any;
  @Input() tootTipText: string = '';
  @Input() checked!: boolean
  @Output() selectClickEmit = new EventEmitter<unknown>();
  @Output() iconClickEmit = new EventEmitter<unknown>();

  @Input() value: any;

  private onModelChange = (_: any) => { };

  propagateTouched = (value: boolean) => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  updateModel(): void {
    this.onModelChange(this.value);
  }

  onFocusChanged(focused: boolean): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['checked']?.currentValue) {
      this.selectClickEmit.emit(this.data)
    }
  }

  onSelect(e: unknown) {
    this.onModelChange(e);
    this.selectClickEmit.emit(e)
  }
  onIconClick(event: MouseEvent, data: unknown) {
    event.stopPropagation();
    event.preventDefault();
    this.iconClickEmit.emit(data);
  }




}
