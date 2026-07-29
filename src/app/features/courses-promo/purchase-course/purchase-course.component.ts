import { ChangeDetectionStrategy, Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlModeChange } from 'src/app/shared/functions/controlModeChange';
import { regExp } from 'src/app/shared/utils/regex';
import { PurchaseService } from '../data-access/purchase.service';
import { CoursesPromoService } from '../courses-promo.service';
import type { CoursePurchaseRequest } from '../models/course-purchase.model';
import { OtpModalComponent } from 'src/app/shared/features/otp/otp-modal/otp-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { SidePanel, SubmitModel } from '../side-panel/side-panel';
import { SidePanelConfig } from '../side-panel/utils/sidepanel-config';
import { CourseId } from 'src/app/shared/utils/enums';
import { MiniProgressBar } from 'src/app/components/mini-progress-bar/mini-progress-bar';
import { StepRoutes } from 'src/app/components/step-helper/utils/models';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { ConfirmComponent } from './confirm/confirm.component';

@Component({
  selector: 'app-purchase-course',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SidePanel,
    MiniProgressBar,
    PersonalInfoComponent,
    ContactInfoComponent,
    ConfirmComponent
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

  readonly routes = signal<StepRoutes[]>([
    { stepId: 1 },
    { stepId: 2 },
    { stepId: 3 },
  ]);

  readonly currentStep = signal(1);


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

  panelConfig = computed<SidePanelConfig>(() => ({
    items:
    {
      label: 'Baby_care_video_collection_for_mothers',
      value: 7,
      showStrikethrough: true,
      show: true
    },
    promoCode: {
      enabled: true,
    },
    totalPrice: {
      final: 4,
      currency: '₾',
      showStrikethrough: true
    },
    terms: {
      documentNumber: 'პირობებს',
      linkUrl: 'https://tbcinsurance-website-files.s3.eu-west-1.amazonaws.com/wordings/FOREIGN_STUDENTS_Health_and_PA_INSURANCE_2024.pdf'
    },
    submitButton: {
      text: 'Pay',
      disabled: false,
      loading:false,
      showSubmit: true
    }
  }))

  onSidePanelSubmit(e: SubmitModel) {

  
  }

  courseId = CourseId
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
