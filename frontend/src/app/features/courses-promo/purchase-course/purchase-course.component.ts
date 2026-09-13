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
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { CoursePurchaseFlowActions, CoursePurchaseFlowSelectors } from '../data-access/state/course-purchase-flow';
import { selectContactInfo, selectCoursePurchaseFlowState, selectPersonalInfo } from '../data-access/state/course-purchase-flow/course-purchase-flow-selectors';
import { PurchaseCourseRequest } from '../data-access/state/course-purchase-flow/models';
import { JsonPipe } from '@angular/common';
import { iSAuthState } from 'src/app/auth/data-access/state/auth/auth-selectors';
import { AuthModalComponent } from 'src/app/features/auth/feature/auth-modal/auth-modal.component';

@Component({
  selector: 'app-purchase-course',
  imports: [
    ReactiveFormsModule,
    SidePanel,
    MiniProgressBar,
    PersonalInfoComponent,
    ContactInfoComponent,
    ConfirmComponent,
    JsonPipe
  ],
  templateUrl: './purchase-course.component.html',
  styleUrl: './purchase-course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PurchaseCourseComponent implements OnInit {

  private readonly purchaseService = inject(PurchaseService)
  private readonly coursesPromoService = inject(CoursesPromoService)
  private readonly store = inject(Store)

  readonly dialog = inject(MatDialog);
  readonly promo = this.coursesPromoService.coursePromo;
  readonly coursePurchaseFlowState = toSignal(this.store.select(selectCoursePurchaseFlowState));
  readonly personalInfoState = toSignal(this.store.select(selectPersonalInfo));
  readonly contactInfoState = toSignal(this.store.select(selectContactInfo));



  readonly currentStep = toSignal(this.store.select(CoursePurchaseFlowSelectors.selectCurrentStep));
  readonly loading = toSignal(this.store.select(CoursePurchaseFlowSelectors.purchaseLoading));
  readonly iSAuthState = toSignal(this.store.select(iSAuthState));

  @Input() courseName: string;
  @Input() sessionId: string;
  courseId = CourseId


  readonly routes = signal<StepRoutes[]>([
    { stepId: 1 },
    { stepId: 2 },
    { stepId: 3 },
  ]);



  readonly form = new FormGroup({
    termsChecked: new FormControl('', [Validators.requiredTrue]),
  });


  get f() {
    return this.form.controls
  }

  ngOnInit(): void {
    console.log(this.courseName)
  }


  private buildPurchaseRequest(): PurchaseCourseRequest {

    return {
      sessionId: this.sessionId,
      userName: this.personalInfoState().userName,
      userLastName: this.personalInfoState().userLastName,
      email: this.contactInfoState().email,
      mobileNumber: this.contactInfoState().mobileNumber,
      productId: +this.courseName,
    };
  }

  confirmOtp(confirm: boolean) {
    this.purchase()
  }

  getPrice(){
    return this.promo()?.find((promo) => promo.courseId === +this.courseName)?.price ?? 0
  }

  panelConfig = computed<SidePanelConfig>(() => ({
    items:
    {
      label: 'Baby_care_video_collection_for_mothers',
      value: this.getPrice(),
      showStrikethrough: true,
      show: true
    },
    promoCode: {
      enabled: true,
    },
    totalPrice: {
      final: this.getPrice(),
      currency: '₾',
      showStrikethrough: true
    },
    terms: {
      documentNumber: 'Terms',
      linkUrl: 'assets/documents/terms-school.pdf'
    },
    submitButton: {
      text: 'Pay',
      disabled: false,
      loading: this.loading(),
      showSubmit: true
    }
  }))

  onSidePanelSubmit(e: SubmitModel) {
    if (!this.iSAuthState()) {
      this.dialog.open(AuthModalComponent, { width: '540px', maxWidth: '95vw' });
      return;
    }

    const params = this.buildPurchaseRequest()

    console.log(params)
    this.store.dispatch(CoursePurchaseFlowActions.purchaseCourse({ request: params }));
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
