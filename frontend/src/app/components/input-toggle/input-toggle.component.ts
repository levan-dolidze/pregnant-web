import { Component, computed, forwardRef, input, linkedSignal, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NgClass } from '@angular/common';

export interface InputToggleModel {
  value: string,
  toggleList: InputToggleListModel[]
  currencySymbol?: string
}

export interface InputToggleListModel {
  name: string;
  index: number;
  currencySymbol: string
  currency: string;
  cssClass?: string;
}

@Component({
  selector: 'app-input-toggle',
  imports: [MatRadioModule,NgClass, FormsModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './input-toggle.component.html',
  styleUrl: './input-toggle.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputToggleComponent),
      multi: true,
    },
  ],
})
export class InputToggleComponent implements OnInit, ControlValueAccessor {


  groupList = input<InputToggleModel>()
  groupListState = linkedSignal(() => this.groupList())

  readonly activeitemState = computed(() => this.groupListState()?.toggleList.find((n) => n.cssClass === 'active'))
  private onModelChange: (value: InputToggleModel) => void = () => { };
  private propagateTouched: () => void = () => { };



  form = new FormGroup({
    array: new FormArray([]),
    limit: new FormControl(),
    name: new FormControl()
  });

  get f() {
    return this.form.controls
  }

  get getFormArray() {
    return (this.form.get('array') as FormArray)
  }

  get getFormArrayControls(): any {
    return (this.form.get('array') as FormArray).controls;
  }


  active = signal<InputToggleListModel | null>(null)
  readonly activeState = computed(() => this.active())


  ngOnInit(): void {
    this.setButtons();
  }


  setButtons(): void {
    const group = this.groupListState();

    if (!group?.toggleList) return;

    for (const item of group.toggleList) {
      this.getFormArray.push(new FormControl({ ...item }));
    }
    this.form.patchValue({
      limit: group.value,
      name: group.currencySymbol
    })
    this.findActive(group.toggleList)
  }

  private findActive(toggleList: InputToggleListModel[]) {
    let active = toggleList.find((x: InputToggleListModel) => x.cssClass === 'active')!
    this.active.set(active)
  }

  onSelectBtn(group: InputToggleListModel) {

    this.groupListState.update(state => {
      if (!state) return state;

      return {
        ...state,
        toggleList: state.toggleList.map(x =>
          x.index === group.index
            ? { ...x, cssClass: 'active' }
            : { ...x, cssClass: 'inactive' }
        )
      };
    });

    this.groupListState()?.toggleList?.forEach((btn, i) => {
      this.getFormArrayControls[i]?.setValue(btn, { emitEvent: false });
    });

    this.onModelChange(this.groupListState()!);
    this.propagateTouched();
  }


  writeValue(value: InputToggleModel): void {
    if (!value || !this.getFormArrayControls?.length) return;

    if (value) {
      value.toggleList.forEach((btn, i) => {
        this.getFormArrayControls[i]?.setValue(btn, {
          emitEvent: false
        });
      });
    }

    else {
      setTimeout(() => {
        this.getFormArray.clear();
        this.setButtons();
      }, 0);
    }
  }



  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
}
