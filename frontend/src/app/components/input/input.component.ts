import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  computed,
  forwardRef,
  signal,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-input',
  imports: [FormsModule, MatInputModule, TranslocoModule, MatIconModule, ReactiveFormsModule],
  template: `
    <ng-container *transloco="let t">
      <mat-form-field
        appearance="fill"
        color="primary"
        class="text-input-cont"
        class="hide-hint w-100"
       
        [class.custom-invalid-input]="isInvalid"
        [class.uppercase]="uppercase"
        >
        <mat-label>
        {{t(placeholder)}}
           @if( isRequired){
            <strong>*</strong>
          }  
      </mat-label>

          <!-- [placeholder]="placeholder" -->

        <input
          style="width: 90%;"
          matInput
          autocomplete="off"
          [type]="effectiveType()"
          [maxlength]="maxlength"
          [minlength]="minlength"
          [max]="max"
          [min]="min"
          [readonly]="readonly"
          [disabled]="isDisabled"
          [(ngModel)]="value"
          (ngModelChange)="updateModel()"
          (focus)="onFocusChanged(true)"
          (blur)="onFocusChanged(false)"
          (keydown)="onKeyDown($event)"
          (change)="onInputChange($event)"
          #inputEl
        />
        @if(type === 'password') {
        <span class="icon">
          <img src="assets/icons/closed eye.svg" (click)="togglePasswordVisibility()" alt="toggle password visibility"/>
        </span>
        } @else if(icon) {
        <span class="icon">
          <img [src]="icon" (click)="onIconClick()"/>
        </span>
        }

      </mat-form-field>
    </ng-container>
  `,

  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements AfterViewInit, ControlValueAccessor {
  value!: string;

  @Input() isDisabled!: boolean;
  @Input() type: 'text' | 'password' | 'email' | 'tel' = 'text'
  @Input() placeholder!: string;
  @Input() placeholderOnDisable!: string;
  @Input() maxlength!: number;
  @Input() uppercase!: string
  @Input() minlength!: number;
  @Input() max!: number;
  @Input() min!: number;
  @Input() index!: number;
  @Input() readonly!: boolean;
  @Input() autofocus!: boolean;
  @Input() isValueSelected!: boolean;
  @Input() isRequired!: boolean;
  @Input() keyDown!: boolean;
  @Input() icon!: string;
  @Input() isInvalid: boolean|undefined = false;
  @Input() identomat: boolean = false;
  @ViewChild('inputEl') input!: ElementRef;
  @Output() focusChanged = new EventEmitter<boolean>();
  @Output() keyDownEmit = new EventEmitter<boolean>();
  @Output() iconClickEmit = new EventEmitter<void>();
  @Output() changeEmit = new EventEmitter<Event>();



  private readonly showPassword = signal(false);
  readonly effectiveType = computed(() =>
    this.type === 'password' && this.showPassword() ? 'text' : (this.type || 'text')
  );

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

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
    // this.isDisabled = isDisabled;
  }

  updateModel(): void {
    this.onModelChange(this.value);
  }

  ngAfterViewInit(): void {
    if (this.autofocus) {
      setTimeout(() => {
        this.focus();
      }, 100);
    }
  }

  focus(): void {
    if (this.isValueSelected) {
      this.input.nativeElement.select();
    }
    this.input?.nativeElement.focus();
  }

  onFocusChanged(focused: boolean): void {
    this.focusChanged.emit(focused);
    if (!focused) {
      this.propagateTouched(true);
    }
  }

  onKeyDown(e: KeyboardEvent) {
    if (this.keyDown && e.key === 'Enter') {
      this.keyDownEmit.emit(true);
    }
  }

  onIconClick() {
    this.iconClickEmit.emit()
  }

  onInputChange(e: Event) {
    this.changeEmit.emit(e)
  }

}