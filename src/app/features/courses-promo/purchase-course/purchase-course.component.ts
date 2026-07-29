import { ChangeDetectionStrategy, Component, inject, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ValidationErrorsDirective } from 'src/app/shared/directives/validation-errors.directive';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';
import { regExp } from 'src/app/shared/utils/regex';
import { PurchaseService } from '../data-access/purchase.service';
import { CoursesPromoService } from '../courses-promo.service';
import type { CoursePurchaseRequest } from '../models/course-purchase.model';
import { NgClass } from '@angular/common';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { OtpModalComponent } from 'src/app/shared/features/otp/otp-modal/otp-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { OtpComponent } from 'src/app/shared/features/otp/otp.component';

@Component({
  selector: 'app-purchase-course',
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
  templateUrl: './purchase-course.component.html',
  styleUrl: './purchase-course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseCourseComponent implements OnInit {

  private readonly purchaseService = inject(PurchaseService)
  private readonly coursesPromoService = inject(CoursesPromoService)

  readonly dialog = inject(MatDialog);
  readonly promo = this.coursesPromoService.coursePromo;

  @Input() courseName: string;


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

  ngOnInit(): void {
    console.log(this.courseName)
  }

  onPay(): void {
    if (this.form.invalid) {
      ControlModeChange.formFieldsModeControl('markAsDirty', this.form);

    } else {

    }
  }

  confirmOtp(confirm: boolean) {

    this.purchase()

  }



  purchase() {
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
