import { Component, forwardRef, Input, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared-module/shared';
import { FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface GroupButtonModel {
  name: string;
  index: number;
  containerType: number;
  icon: string;
  cssClass?: string;
}

@Component({
  selector: 'app-button-group',
  imports: [SharedModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonGroupComponent),
      multi: true,
    },
  ],
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {

  @Input() groupList = signal<GroupButtonModel[]>([]);

  private onModelChange: (value: GroupButtonModel[]) => void = () => { };
  private propagateTouched: () => void = () => { };

  form = new FormGroup({
    array: new FormArray([])
  });


  ngOnInit(): void {
    this.setButtons();
  }


  get getFormArray() {
    return (this.form.get('array') as FormArray)
  }

  get getFormArrayControls() {
    return (this.form.get('array') as FormArray).controls;
  }


  setButtons(): void {
    for (const item of this.groupList()) {
      this.getFormArray.push(new FormControl({ ...item }));
    }
  }


  onSelectBtn(group: GroupButtonModel) {
    const btn = this.groupList()[group.index];

    btn.cssClass = btn.cssClass === 'active' ? 'inactive' : 'active';

    this.getFormArrayControls.at(group.index).setValue(btn);

    const selected = this.groupList().filter(b => b.cssClass === 'active');

    this.onModelChange(selected);
    this.propagateTouched();
  }

  writeValue(value: GroupButtonModel[]): void {
    if (value) {
      let i = 0;
      for (const btn of this.groupList()) {
        btn.cssClass = value[i]?.cssClass ?? 'inactive';
        this.getFormArrayControls.at(i)?.setValue(btn);
        i++;
      }


    }
    else {
      setTimeout(() => {
        this.getFormArray.clear();
        this.setButtons();
      }, 0);

    }
  }

  registerOnChange(fn): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn): void {
    this.propagateTouched = fn;
  }
}
