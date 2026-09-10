import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { TranslocoModule } from '@jsverse/transloco';

export interface InputCheckboxModel {
  displayName: string,
  displaySubName:string,
  value: boolean,
  index: number,
  id: string,
  isInsurer:boolean,
  userId?:number,
  contrahentId?:number,
}
export interface EmitAction {
  inputCheckbox: InputCheckboxModel,
  actionType: ActionType
}

export type ActionType = 'edit' | 'delete'|'redirect';


@Component({
  selector: 'app-input-checkbox',
  imports: [MatCheckboxModule,JsonPipe, TranslocoModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './input-checkbox.component.html',
  styleUrl: './input-checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCheckboxComponent),
      multi: true
    }
  ],
})
export class InputCheckboxComponent implements ControlValueAccessor {

  @Input() isDisabled: boolean = false;
  @Input({ required: true }) data: InputCheckboxModel[] = [];
  @Output() activeBtnModeEmit: EventEmitter<EmitAction> = new EventEmitter();
  @Output() selectItemEmit: EventEmitter<InputCheckboxModel[]> = new EventEmitter();

  value: any;

  private onModelChange = (_: any) => { };

  propagateTouched = (value: boolean) => { };

  writeValue(value: InputCheckboxModel[]): void {
    console.log(value)
    this.value = value ?? [];
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

  updateModel(event: MatCheckboxChange, inputCheckbox: InputCheckboxModel): void {
    const updatedValue = this.value.map((state: InputCheckboxModel) => state.index === inputCheckbox.index ?
      { ...state, value: event.checked } : { ...state }
    )
    this.onModelChange(updatedValue);
    this.selectItemEmit.emit(updatedValue)
  }

  onFocusChanged(focused: boolean): void {

  }

  onChange(e: any) {
    console.log(e)
  }

  onActionClick(event: Event, actionType: ActionType, selectedItem: InputCheckboxModel) {

    event.preventDefault();
    const params = {
      actionType: actionType,
      inputCheckbox: selectedItem
    }
    this.activeBtnModeEmit.emit(params)
  }
}
