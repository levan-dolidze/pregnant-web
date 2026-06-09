import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared-module/shared';

@Component({
  selector: 'app-text-area',
  standalone: true,
  imports: [SharedModule],
  template:`
  <ng-container *transloco="let t" >

<textarea
name="text"
[placeholder]="placeholder"
[(ngModel)]="value"
(ngModelChange)="updateModel()"
[disabled]="isDisabled"
[style.height]="height +'px'"
></textarea>

</ng-container>
  `,
  styleUrl: './text-area.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextAreaComponent),
      multi: true,
    },
  ],
})
export class TextAreaComponent implements ControlValueAccessor {
  value!: string;
  @Input() isRequired: boolean;
  @Input() placeholder:string ='';
  @Input() isDisabled: boolean;
  @Input() height ='88';

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

}
