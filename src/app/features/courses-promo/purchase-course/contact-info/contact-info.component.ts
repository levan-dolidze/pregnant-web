import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { OtpComponent } from 'src/app/shared/features/otp/otp.component';
import { ValidationErrorsDirective } from 'src/app/shared/directives/validation-errors.directive';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';
import { regExp } from 'src/app/shared/utils/regex';

@Component({
  selector: 'app-contact-info',
  imports: [ReactiveFormsModule, MatFormFieldModule, InputComponent, ButtonComponent, OtpComponent, ValidationErrorsDirective],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoComponent {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(regExp.email)]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(regExp.mobileGe)])
  })
  
  @Output() confirmOtpEmit = new EventEmitter<boolean>();

  onNext(): void {
    if (this.form.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.form);
    } else {

    }
  }
}
