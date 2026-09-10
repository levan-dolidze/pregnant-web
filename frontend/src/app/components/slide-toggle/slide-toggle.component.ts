import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'lib-slide-toggle',
  imports: [MatSlideToggleModule, FormsModule],
  changeDetection:ChangeDetectionStrategy.OnPush,
  template: `
  <mat-slide-toggle class="mode"
  id="al" aria-label="Toggle"
  [disabled]="isDisabled ||manualDisable|| null"
  [(ngModel)]="value"
  (ngModelChange)="updateModel()">
  </mat-slide-toggle>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlideToggle),
      multi: true,
    },
  ],
})
export class SlideToggle {


  @Input() isDisabled: any = false;
  @Input() manualDisable: boolean = false;
  @Input() value!: boolean;
  @Output() onToggleChange: EventEmitter<boolean> = new EventEmitter()


  private onModelChange = (_: any) => {
  };

  propagateTouched = (value: boolean) => {
  };


  writeValue(value: boolean): void {
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
    this.onToggleChange.emit(this.value)
  }

}
