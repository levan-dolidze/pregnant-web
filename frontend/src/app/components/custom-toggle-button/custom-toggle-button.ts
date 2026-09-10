import { NgClass } from '@angular/common';
import { Component, computed, forwardRef, input, linkedSignal, OnInit, signal } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';


export interface CustomToggleButtonModel {
  name: string;
  index: number;
  value: boolean
  symbol?: string;
  cssClass?: string;
}



@Component({
  selector: 'app-custom-toggle-button',
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './custom-toggle-button.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomToggleButton),
      multi: true,
    },
  ],
  styleUrl: './custom-toggle-button.scss',
})
export class CustomToggleButton implements OnInit, ControlValueAccessor {


  groupList = input<CustomToggleButtonModel[]>()
  groupListState = linkedSignal(() => this.groupList())

  readonly activeitemState = computed(() => this.groupListState().find((n) => n.cssClass === 'active'))
  private onModelChange: (value: CustomToggleButtonModel) => void = () => { };
  private propagateTouched: () => void = () => { };



  form = new FormGroup({
    array: new FormArray([]),
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


  active = signal<CustomToggleButtonModel | null>(null)
  readonly activeState = computed(() => this.active())


  ngOnInit(): void {
    this.setButtons();
  }


  setButtons(): void {
    const group = this.groupListState();

    if (!group) return;

    for (const item of group) {
      this.getFormArray.push(new FormControl({ ...item }));
    }

    this.findActive(group)
  }

  private findActive(toggleList: CustomToggleButtonModel[]) {
    let active = toggleList.find((x: CustomToggleButtonModel) => x.cssClass === 'active')!
    this.active.set(active)
  }


  updateActive(group: CustomToggleButtonModel) {
    this.groupListState.update(list =>
      list.map(x =>
        x.index === group.index
          ? { ...x, cssClass: 'active' }
          : { ...x, cssClass: 'inactive' }
      )
    );
    this.groupListState()?.forEach((btn, i) => {
      this.getFormArrayControls[i]?.setValue(btn, { emitEvent: false });
    });
  }
  onSelectBtn(group: CustomToggleButtonModel) {


    this.updateActive(group)


    this.onModelChange(group);
    this.propagateTouched();
  }


  writeValue(value: CustomToggleButtonModel): void {

    if (!value || !this.getFormArrayControls?.length) return;

    if (value) { this.updateActive(value) }

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
