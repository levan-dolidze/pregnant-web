import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs';
import { token } from 'src/app/auth/data-access/state/auth/auth-selectors';
import { LoaderService } from 'src/app/components/loader/loader.service';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const loaderService = inject(LoaderService);

  const accessToken = toSignal(store.select(token));

  loaderService.updateLoader(true);

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken()}`,
      },
    })
  ).pipe(
    finalize(() => {
      loaderService.updateLoader(false);
    })
  );

}