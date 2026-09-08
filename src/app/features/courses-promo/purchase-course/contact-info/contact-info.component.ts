import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { OtpComponent } from 'src/app/shared/features/otp/otp.component';
import { ValidationErrorsDirective } from 'src/app/shared/directives/validation-errors.directive';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';
import { regExp } from 'src/app/shared/utils/regex';
import { Store } from '@ngrx/store';
import { CoursePurchaseFlowActions } from '../../data-access/state/course-purchase-flow';
import { OtpService } from 'src/app/shared/features/otp/service/otp-service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-contact-info',
  imports: [ReactiveFormsModule, MatFormFieldModule, InputComponent, ButtonComponent, OtpComponent, ValidationErrorsDirective, TranslocoModule],
  templateUrl: './contact-info.component.html',
  styleUrl: './contact-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactInfoComponent {

  private readonly store = inject(Store);
  private readonly otpService = inject(OtpService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(regExp.email)]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(regExp.mobileGe)])
  })

  @Output() confirmOtpEmit = new EventEmitter<boolean>();

  private readonly showOtp = signal<boolean>(false)
  readonly showOtpState = computed(() => this.showOtp())

  onNext(): void {
    if (this.form.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.form);
    } else {
      this.showOtp.set(true)
    }
  }

  onOtpConfirmed(confirmed: boolean): void {
    console.log(confirmed)

    if (confirmed){
      const { email, mobileNumber } = this.form.getRawValue();
      this.store.dispatch(CoursePurchaseFlowActions.saveContactInfo({
        contactInfo: { email, mobileNumber },
        step: 3
      }));
    }
  }


}
