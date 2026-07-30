import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { PurchaseService } from '../../purchase.service';
import {
  goToStep,
  purchaseCourse,
  purchaseCourseFailure,
  purchaseCourseSuccess,
  savePersonalInfo,
} from './course-purchase-flow-actions';
import { selectPurchaseRequest } from './course-purchase-flow-selectors';

@Injectable()
export class CoursePurchaseFlowEffects {

  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly purchaseService = inject(PurchaseService);

  savePersonalInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savePersonalInfo),
      filter(({ step }) => step != null),
      map(({ step }) => goToStep({ step }))
    )
  );

  purchaseCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(purchaseCourse),
      withLatestFrom(this.store.select(selectPurchaseRequest)),
      switchMap(([, request]) =>
        this.purchaseService.pay(request).pipe(
          map(() => purchaseCourseSuccess()),
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
      map(() => goToStep({ step: 4 }))
    )
  );
}
