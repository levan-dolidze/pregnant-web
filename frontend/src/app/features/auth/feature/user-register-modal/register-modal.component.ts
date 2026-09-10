import { ChangeDetectionStrategy, Component, Inject, inject, Optional } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl, FormGroup, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@jsverse/transloco';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/auth/data-access/state/auth';
import { loading, selectAccount } from 'src/app/auth/data-access/state/auth/auth-selectors';
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

  private readonly store = inject(Store);

  readonly loadingState = toSignal(this.store.select(loading));
  readonly selectAccount = toSignal(this.store.select(selectAccount));

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
      this.store.dispatch(AuthActions.userRegister({ registerRequest: request }));
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
