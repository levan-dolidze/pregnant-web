import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AlertService } from 'src/app/components/alert/alert.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  const alertService = inject(AlertService);

  return next(req).pipe(

    catchError((err) => {
      if (err?.error === 'AuthToken not found') {
        console.error(err?.error)
      }
      else {
        alertService.notification(
          {
            message: err?.error || 'Unexpected_Error',
            messageType: 'error',
            showClose: true
          }
        )
      }

      return throwError(() => err);
    })
  );
};
