import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { PurchaseService } from '../../purchase.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import {
  goToStep,
  purchaseCourse,
  purchaseCourseFailure,
  purchaseCourseSuccess,
  saveContactInfo,
  savePersonalInfo,
} from './course-purchase-flow-actions';

@Injectable()
export class CoursePurchaseFlowEffects {

  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly purchaseService = inject(PurchaseService);
  private readonly alertService = inject(AlertService);

  savePersonalInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savePersonalInfo),
      filter(({ step }) => step != null),
      map(({ step }) => goToStep({ step }))
    )
  );
  saveContactInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveContactInfo),
      filter(({ step }) => step != null),
      map(({ step }) => goToStep({ step }))
    )
  );

  purchaseCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchaseCourse),
      switchMap(({ request }) =>
        this.purchaseService.registerOrder(request).pipe(
          map((res) => {
            console.log(res);
            return purchaseCourseSuccess({ paymentUrl: res.paymentUrl });
          }),
          catchError((err) =>
            of(
              purchaseCourseFailure({
                error: err?.error?.message ?? 'purchase failed',
              })
            )
          )
        )
      )
    )
  );

  purchaseCourseSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchaseCourseSuccess),
      tap(({ paymentUrl }) => {
        console.log(paymentUrl)
        globalThis.location.href = paymentUrl
      })
    ),
    { dispatch: false }
  );
}
