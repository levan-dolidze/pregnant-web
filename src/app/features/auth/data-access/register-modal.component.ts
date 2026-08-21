import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@jsverse/transloco';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';
import { SharedModule } from 'src/app/shared/shared-module/shared';
import { regExp } from 'src/app/shared/utils/regex';

function passwordsMatchValidator(passwordKey: string, confirmKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey);
    const confirmPassword = group.get(confirmKey);
    if (!password || !confirmPassword) {
      return null;
    }

    if (confirmPassword.value && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ ...confirmPassword.errors, mismatch: true });
    } else if (confirmPassword.errors) {
      const { mismatch, ...rest } = confirmPassword.errors;
      confirmPassword.setErrors(Object.keys(rest).length ? rest : null);
    }

    return null;
  };
}

@Component({
  selector: 'app-register-modal',
  imports: [TranslocoModule, SharedModule],
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterModalComponent {
  constructor(
    @Optional() public dialogRef: MatDialogRef<RegisterModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: unknown
  ) { }

  registerForm = new FormGroup({
    personalNumber: new FormControl('', [Validators.required, Validators.pattern(regExp.personalID)]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(regExp.mobileGe)]),
    email: new FormControl('', [Validators.required, Validators.pattern(regExp.email)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: passwordsMatchValidator('password', 'confirmPassword') });

  get f() {
    return this.registerForm.controls;
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.registerForm);
    } else {
      const request = this.registerForm.getRawValue();
      console.log(request);
      // TODO: dispatch registration once the backend endpoint exists
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
