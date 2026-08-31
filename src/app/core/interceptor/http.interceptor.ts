import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs';
import { iSAuthState, token } from 'src/app/auth/data-access/state/auth/auth-selectors';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { accessTokenState } from 'src/app/shared/state/step-state/step-selectors';


export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const sessionStorageService = inject(SessionStorageService);
  const loaderService = inject(LoaderService);

  // const accessToken = toSignal(store.select(accessTokenState));
  const accessToken = toSignal(store.select(token));
  // const tok = sessionStorageService.getKey('token');

  console.log(accessToken())
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