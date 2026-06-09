import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

export interface RectangleButtonModel {
  value: number;
  yesNo?:boolean,
  displayName: string,
  isDisabled?: boolean,
  cssClass?: string;
  subDisplayName?: string
  icon?: string,
  primary?: boolean,
  valueNumber?:number,
  originalPrice?:number,
  displayValue?:number
}

@Component({
  selector: 'lib-rectangle-toggle-button',
  imports: [MatRadioModule, FormsModule, MatInputModule, NgClass],
  templateUrl: './rectangle-toggle-button.html',
  styleUrl: './rectangle-toggle-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RectangleToggleButton),
      multi: true,
    },
  ],

})
export class RectangleToggleButton implements ControlValueAccessor {


  groupList = input<RectangleButtonModel[]>([]);
  @Output() changeEmit = new EventEmitter<RectangleButtonModel>();

  private onModelChange: (value: RectangleButtonModel) => void = () => { };
  private propagateTouched: () => void = () => { };

  value: any;


  writeValue(value: RectangleButtonModel): void {
    this.value = value?.value;
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }


updateModel(): void {
  const item = this.groupList().find((x) => x.value === this.value);
  if (item) { 
    this.onModelChange(item);
    this.changeEmit.emit(item);
  }
}
}
