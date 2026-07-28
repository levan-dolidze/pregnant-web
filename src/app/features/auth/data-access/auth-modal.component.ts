import { ChangeDetectionStrategy, Component, DestroyRef, inject, Inject, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { Store } from '@ngrx/store';
import { AccountService } from 'src/app/auth/data-access/account.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';
import { SharedModule } from 'src/app/shared/shared-module/shared';
import { TranslationService } from 'src/app/shared/translate/translation.serive';

@Component({
  selector: 'app-auth-modal',
  imports: [TranslocoModule,SharedModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthModalComponent implements OnInit, OnChanges {
  constructor(
    @Optional() public dialogRef: MatDialogRef<AuthModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: unknown
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }


  protected readonly store = inject(Store);

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

  get if() {
    return this.initForm.controls;
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


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onLogin() {
    if (this.initForm.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.initForm);
    }
    else {
      const request = this.initForm.getRawValue();
      // this.store.dispatch(AuthActions.login({ loginRequest: request }));

    }
  }

  backToCredentials(): void {
    this.initForm.reset()
    // this.store.dispatch(AuthActions.backToCredentials());
  }
}
