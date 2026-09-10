import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, forwardRef, inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslocoModule } from '@jsverse/transloco';
import { Store } from '@ngrx/store';
import { selectStep } from 'src/app/shared/state/step-state/step-selectors';

@Component({
  selector: 'app-checkbox',
  imports: [MatCheckboxModule, TranslocoModule, FormsModule, NgClass, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkbox.component.html',
  styles: [
    `
@use "variables" as *;
@use "mixins" as *;
   
   .check-box-cont__link{
        text-decoration: underline;
        text-decoration-color: $primary;

      span{
        margin-left: 4px;
            @include font(14px, 700, $primary, $font-bold);
            text-decoration: none;
      }
   };

   .disabled {
    opacity:0,5;
    pointer-events: none;
    color:#2A3547;
   }
   
   `

  ],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
})
export class CheckboxComponent {
  @Input() isDisabled: any = false;
  @Input() label: string = '';
  @Input() isLink: boolean = false;
  @Input() address: string;
  @Input() addressTxt: string;
  @Input() session: string;
  @Input() target: string;
  @Input() isInvalid: boolean;

  readonly store = inject(Store);
  readonly selectStep = toSignal(this.store.select(selectStep))

  value: any;

  private onModelChange = (_: any) => {
  };

  propagateTouched = (value: boolean) => {
  };

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
    console.log(isDisabled)
  }

  updateModel(): void {
    this.onModelChange(this.value);
  }

  onLinkOpen(address: string) {

  }


}
