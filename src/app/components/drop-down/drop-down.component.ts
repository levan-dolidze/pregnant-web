import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@jsverse/transloco';
import { IDropDown } from '../../shared/utils/iui-list-item';
@Component({
  selector: 'app-drop-down',
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatSelectModule, ReactiveFormsModule, MatInputModule, TranslocoModule],
  template: `

<ng-container *transloco="let t">

  <div class="input-block">
    <mat-form-field
      appearance="fill"
      class="w-100"
        [ngClass]="{
      isReadonly: isReadonly,
      'open': isOpen,
      'close': !isOpen,
      'form-invalid-control': control?.invalid&&control?.dirty
    }"
      >
      <!-- 'form-invalid-control': control?.invalid&&control?.dirty&&!isOpen -->

      <mat-label>{{ t(placeholder)}}
        @if(isRequired){
          <span class="required-star"><img src="../../../../assets/images/svgs/_required-star.svg" alt="Star"></span>
        }
      </mat-label>

      <!-- [formControl]="selectControl" -->

      <mat-select
        class="mat-select"
        [disabled]="isDisabled"
        [formControl]="selectControl"
        (selectionChange)="onSelectionChange($event)"
        (openedChange)="toggle($event)"
        >
        @for (item of list; track item; let i = $index) {
          <mat-option
            [value]="item.id"
            class="option"
            [disabled]="bookedTimes.includes(item.text!)">
            {{ item.text }}
          </mat-option>
        }

      </mat-select>

      <!-- @if(isRemove) {
      <img (click)="onRemoveVal()" src="../../../../assets/images/svgs/_close_native.svg" alt="Close" class="close-icon">
      } -->
      <img src="../../../assets/images/svgs/_dropdown-arrow.svg" alt="Arrow" class="dropdown-icon">

    </mat-form-field>
  </div>
</ng-container>

`,
  styleUrl: './drop-down.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownComponent),
      multi: true,
    },
  ],
})
export class DropDownComponent implements ControlValueAccessor {
  isOpen: boolean;
  toolTipDisplay: boolean;
  @Input() list: IDropDown[] = [];
  @Input() isDisabled: boolean;
  @Input() placeholder: string;
  @Input() isReadonly: boolean;
  @Input() control;
  @Input() bookedTimes: string[] = [];
  @Input() isRequired: boolean;
  @Input() isRemove: boolean;

  selectControl: FormControl = new FormControl();
  selectionChange = output<number>();


  toggle(ev: boolean) {
    this.isOpen = ev;
  }

  propagateTouched = () => {
  };

  writeValue(value): void {
    setTimeout(() => {
      this.selectControl.setValue(value);
    }, 100);
  }

  registerOnChange(fn): void {
    this.onModelChange = fn;
  }



  registerOnTouched(fn): void {
    this.propagateTouched = fn;
  }

  private onModelChange: Function = (_) => { };

  onSelectionChange(item): void {
    this.onModelChange(item.value);
    this.selectionChange.emit(item.value);
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }


}
