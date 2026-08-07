import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, Inject, OnChanges, OnInit, Optional, signal, SimpleChanges } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/auth/data-access/account.service';
import { AuthActions } from 'src/app/auth/data-access/state/auth';
import { loading } from 'src/app/auth/data-access/state/auth/auth-selectors';
import { AlertService } from 'src/app/components/alert/alert.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { OtpComponent } from 'src/app/shared/features/otp/otp.component';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';
import { SharedModule } from 'src/app/shared/shared-module/shared';
import { TranslationService } from 'src/app/shared/translate/translation.serive';

@Component({
  selector: 'app-auth-modal',
  imports: [TranslocoModule,SharedModule,OtpComponent],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent implements OnInit, OnChanges {
  constructor(
    @Optional() public dialogRef: MatDialogRef<AuthModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: unknown
  ) {}



  protected readonly store = inject(Store);

  readonly loadingState = toSignal(this.store.select(loading))
  accountService = inject(AccountService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  alert = inject(AlertService);
  loaderService = inject(LoaderService);
  destroyRef = inject(DestroyRef);
  translate = inject(TranslationService);

  // readonly loaded = toSignal(this.store.select(selectLoginLoaded));
  // readonly loading = toSignal(this.store.select(loading));


  initForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  smsAuthForm = new FormGroup({
    personalNumber: new FormControl('', [Validators.required]),
  });

  forgotPassForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    newPassword: new FormControl(''),
    confirmNewPassword: new FormControl(''),
  });

  authActionType: 'initLogin' | 'smsAuth' | 'forgotPass' = 'initLogin';

  get if() {
    return this.initForm.controls;
  }

  get smf() {
    return this.smsAuthForm.controls;
  }

  // account = toSignal(this.store.select(AuthSelectors.selectAccount));

  ngOnInit(): void {
    // if (!environment.production) {
    //   this.initForm.patchValue({
    //     username: '598404779',
    //     password: 'Ald@gi1234',
    //   });
    // }
  }

  clientNumber = '591880290'


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  readonly otpConfirmed = signal(false);

  onOtpConfirmed(confirmed: boolean){
    this.otpConfirmed.set(confirmed);

    if (confirmed) {
      this.forgotPassForm.controls.newPassword.addValidators(Validators.required);
      this.forgotPassForm.controls.confirmNewPassword.addValidators(Validators.required);
      this.forgotPassForm.controls.newPassword.updateValueAndValidity();
      this.forgotPassForm.controls.confirmNewPassword.updateValueAndValidity();
    }
  }

  confirmOtp(event:boolean){

  }

  private forgotPassInit =signal<boolean>(false);
  readonly forgotPassInitState = computed(() => this.forgotPassInit())

  onLogin() {
    if (this.initForm.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.initForm);
    }
    else {
      const request = this.initForm.getRawValue();
      console.log(request)
      this.store.dispatch(AuthActions.login({ loginRequest: request }));
    }
  }

  onSmsAuthSubmit(): void {
    if (this.smsAuthForm.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.smsAuthForm);
    } else {
      const request = this.smsAuthForm.getRawValue();
      console.log(request)
    }
  }

  onForgotPassSubmit(): void {
    if (this.forgotPassForm.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.forgotPassForm);
    } else if (!this.forgotPassInitState()) {
      // step 1: username confirmed, now show the OTP field
      this.forgotPassInit.set(true);
    } else {
      const request = this.forgotPassForm.getRawValue();
      console.log(request)
      // TODO: dispatch forgot-password reset once the backend endpoint exists
    }
  }

  backToCredentials(): void {
    this.initForm.reset()
    // this.store.dispatch(AuthActions.backToCredentials());
  }

  onForgotPassword(): void {
    this.authActionType = 'forgotPass';
  }

  onSmsAuth(): void {
    this.authActionType = 'smsAuth';
  }

  onBackToLogin(): void {
    this.authActionType = 'initLogin';
    this.smsAuthForm.reset();
    this.forgotPassForm.reset();
    this.forgotPassInit.set(false);
    this.otpConfirmed.set(false);
  }



  onRegister(): void {
    // TODO: wire to registration flow once the backend endpoint/route exists
  }


  onClose(): void {
    this.dialogRef.close();
  }

}
