import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ValidationErrorsDirective } from 'src/app/shared/directives/validation-errors.directive';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';
import { regExp } from 'src/app/shared/utils/regex';
import { PurchaseService } from '../data-access/purchase.service';
import type { CoursePurchaseRequest } from '../models/course-purchase.model';
import { NgClass } from '@angular/common';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { OtpModalComponent } from 'src/app/shared/features/otp/otp-modal/otp-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { OtpComponent } from 'src/app/shared/features/otp/otp.component';

@Component({
  selector: 'app-purchase-pregnant-course',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    InputComponent,
    ButtonComponent,
    ValidationErrorsDirective,
    NgClass,
    CheckboxComponent,
    OtpComponent
  ],
  templateUrl: './purchase-pregnant-course.component.html',
  styleUrl: './purchase-pregnant-course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchasePregnantCourseComponent {

  private readonly purchaseService = inject(PurchaseService)

  readonly dialog = inject(MatDialog);

  readonly form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    termsChecked: new FormControl('', [Validators.requiredTrue]),
    mobileNumber: new FormControl('', [Validators.required, Validators.pattern(regExp.onlyNumbers)]),
    email: new FormControl('', [Validators.required, Validators.pattern(regExp.email)]),
  });


  get f() {
    return this.form.controls
  }

  
  onPay(): void {
    if (this.form.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.form);

    } else {

    }
  }

  confirmOtp(confirm:boolean){

    this.purchase()

  }



  purchase(){
    const params = this.form.getRawValue();

    // this.purchaseService.pay(params).subscribe({
    //   next: (() => {

    //   }),
    //   error: (() => {

    //   })
    // })
  }

  // openOtp() {
  //   const dialogRef = this.dialog.open(OtpModalComponent, {
  //     position: { bottom: '0' },
  //     panelClass: 'dialog-border-radius',

  //     data: {
  //       otpDialogModel: signal({
  //         title: 'შეიყვანე კოდი',
  //         mobileNumber: this.f.mobileNumber.value,
  //       })
  //     },
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       // const contacts = this.form.getRawValue();
  //       // this.store.dispatch(saveContactsSuccess({ contacts }))

  //       // const stepParams = this.navigateParams()
  //       // this.store.dispatch(getPassportTemplatesInit({ stepParams }))
  //     }
  //   })
  // }

}
