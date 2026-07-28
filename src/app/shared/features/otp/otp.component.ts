import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Inject, input, OnInit, Optional, Output, Signal, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  NgOtpInputComponent,
  NgOtpInputConfig,
  NgOtpInputModule,
} from 'ng-otp-input';
import { HttpErrorResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OtpService } from './service/otp-service';
import { OtpResponse, VerifyOtpRequest } from './models';
import { TranslocoModule } from '@jsverse/transloco';
import { take } from 'rxjs';
export interface OtpDialog {
  mobileNumber: string,
}
@Component({
  selector: 'app-otp',
  imports: [NgOtpInputModule, TranslocoModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtpComponent implements OnInit {


  readonly otpService = inject(OtpService);


  constructor(
    @Optional() public dialogRef: MatDialogRef<OtpComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA)
    public data: { otpDialogModel: Signal<OtpDialog> } | null
  ) { }

  @Output() confirmOtpEmit: EventEmitter<boolean> = new EventEmitter();
  @Output() resendOtpEmit: EventEmitter<void> = new EventEmitter();

  clientNumber = input.required<string>();

  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput: NgOtpInputComponent;


  private readonly TIME_LEFT = 30
  timerInterval: any;
  otpFirstValueFocused: boolean = false;

  readonly config = signal<NgOtpInputConfig>({
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputClass: 'has-dash'
  })

  readonly configState = computed(() => this.config());

  private readonly timeLeftToEnterOtp = signal<number>(this.TIME_LEFT);
  readonly timeLeftToEnterOtpState = computed(() => this.timeLeftToEnterOtp());

  private readonly passwordId = signal<string>('');
  readonly passwordIdState = computed(() => this.passwordId())


  ngOnInit(): void {

    this.getOtp()
    this.startTimer()

  }

  otpform = new FormGroup({
    otp: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
    ]),
  });

  get otpf() {
    return this.otpform.controls;
  }

  otpFocusFirstValue(t: any) {
    if (this.ngOtpInput && !this.otpFirstValueFocused) {
      let element = document.getElementById(`otp_0_${t.componentKey}`);
      if (element) {
        this.otpFirstValueFocused = (document.activeElement === element);
        element.focus();
      }
    }
  }

  protected onOtpChange(otp: string) {
    this.dynamicInputDash()

    const maxLength = 4;

    while (otp?.length === maxLength) {
      this.onVerifyOtp()
      return
    }
    this.otpf.otp.setValue(otp)
  }

  startTimer() {
    this.timeLeftToEnterOtp.set(this.TIME_LEFT)

    this.timerInterval = setInterval(() => {
      this.timeLeftToEnterOtp.update((sec) => sec - 1)

      if (this.timeLeftToEnterOtpState() === 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }


  private getOtp() {
    if (!this.clientNumber()) return

    else {
      const params = {
        mobileNumber: this.clientNumber(),
      };

      this.otpService.requestOtp(params)
        .pipe().subscribe({
          next: ((response: OtpResponse) => {
            this.passwordId.set(response.guid)
          }),
          error: ((err) => {
            console.error(err)
          })
        })
    }

  }

  resendOtp() {
    this.clearOtp();
    this.startTimer()
    this.getOtp()
  }

  private readonly verifyUtpLoading = signal<{ loading: boolean, error: string }>({ loading: false, error: '' });
  readonly verifyUtpLoadingState = computed(() => this.verifyUtpLoading())

  onVerifyOtp() {

    if (this.otpf.otp.invalid) {
      this.otpf.otp.markAsDirty();
    }
    else {
      this.verifyUtpLoading.set({ loading: true, error: '' })
      const params = {
        code: this.otpf.otp.value,
        passwordId: this.passwordIdState(),
        phoneNumber: this.clientNumber(),
        productName: null
      } as VerifyOtpRequest

      this.otpService.verifyRequestedOtpCode(params)
        .pipe(take(1)).
        subscribe({
          next: ((passwordId: string) => {
            this.onClose(true)
            this.confirmOtpEmit.emit(true)
            this.verifyUtpLoading.set({ loading: false, error: '' })
            clearInterval(this.timerInterval);
          }),
          error: ((err: HttpErrorResponse) => {
            console.error(err.error)
            this.otpf.otp.markAsDirty();
            this.otpf.otp.setErrors({
              invalidOtp: true
            });
            this.verifyUtpLoading.set({ loading: false, error: err.error })
          })
        })
    }
  }

  private clearOtp(): void {
    this.ngOtpInput?.setValue(null);
  }

  private dynamicInputDash() {
    const inputs = document.querySelectorAll('.ng-otp-input-wrapper input');

    inputs.forEach((input: HTMLInputElement) => {
      input.value ? input.classList.remove('has-dash') :
        input.classList.add('has-dash');
    });
  }

  onClose(result?: boolean) {
    this.dialogRef?.close(result);
  }
}
