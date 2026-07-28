import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, map, tap } from 'rxjs';
import { AuthSelectors } from 'src/app/auth/data-access/state/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(AuthSelectors.iSAuthState).pipe(
    distinctUntilChanged(),
    tap((isAuth) => {
      console.log(isAuth)
      if (isAuth) {
        router.navigate(['']);
      }
    }),
    map((isAuth) => isAuth)
  );
};
