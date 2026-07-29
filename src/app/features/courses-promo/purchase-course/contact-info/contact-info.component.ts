import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ValidationErrorsDirective } from 'src/app/shared/directives/validation-errors.directive';
import { OtpComponent } from 'src/app/shared/features/otp/otp.component';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';

@Component({
  selector: 'app-contact-info',
  imports: [ReactiveFormsModule, MatFormFieldModule, InputComponent, ButtonComponent, ValidationErrorsDirective, OtpComponent],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoComponent {

  form = new FormGroup({
    mobileNumber: new FormControl(),
    email: new FormControl()
  })
  @Output() confirmOtpEmit = new EventEmitter<boolean>();

  onNext(): void {
    if (this.form.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.form);
    } else {

    }
  }
}
