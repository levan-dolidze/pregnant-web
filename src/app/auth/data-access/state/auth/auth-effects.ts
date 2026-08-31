import { inject, Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT,
} from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, of, switchMap, tap } from 'rxjs';
import {
  login,
  loginError,
  loginSuccess,
  logout,
  logOutSuccess,
  userRegister,
  userRegisterError,
  userRegisterSuccess,
} from './auth-actions';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from 'src/app/auth/data-access/account.service';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { AlertService } from 'src/app/components/alert/alert.service';
import { LoginResponseCode } from '../enum';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly sessionStorage = inject(SessionStorageService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly accountService = inject(AccountService);
  private readonly alertService = inject(AlertService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      mergeMap(() => {
        const auth = this.sessionStorage.getKey('auth')
        if (!auth) return EMPTY;

        return of(loginSuccess({
          tokenGroup: auth
        }));
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ loginRequest }) =>
        this.accountService.login(loginRequest).pipe(
          map((res) =>
            res.success
              ? loginSuccess({ tokenGroup: res.data })
              : loginError({ message: res.result })
          ),
          catchError((err) => {
            return of(loginError({ message: err?.error?.result }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      tap(({ tokenGroup }) => {

        if (tokenGroup) {
          this.sessionStorage.saveKey('auth', JSON.stringify(tokenGroup));
          const rout = this.activatedRoute.snapshot.queryParams['returnUrl'] ?? '';
          this.router.navigate([rout]);
        }
      })
    ), { dispatch: false }
  );


  loginError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginError),
      tap(({ message }) => {
        let msg = message.code === LoginResponseCode.CredentialInvalid ? 'მომხმარებელი ან პაროლი არასწორია' : 'სისტემაში შესვლა ვერ მოხდა'
        this.alertService.notification({
          message: msg,
          messageType: 'error',
        });
      })
    ), { dispatch: false }
  );


  userRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRegister),
      switchMap(({ registerRequest }) => this.accountService.userRegister(registerRequest).pipe(
        map((response) => userRegisterSuccess({ tokenGroup: response })),
        catchError((message) => of(userRegisterError({message})))
      ))
    )
  );

  userRegisterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRegisterSuccess),
      tap(({ tokenGroup }) => {

        if (tokenGroup) {
          this.sessionStorage.saveKey('auth', JSON.stringify(tokenGroup));
          this.dialog.closeAll();
          this.alertService.notification({
            message: 'წარმატებით დარეგისტრირდა',
            messageType: 'success',
          });

          // const rout = this.activatedRoute.snapshot.queryParams['returnUrl'] ?? '';
          // this.router.navigate([rout]);
        }
      })
    ), { dispatch: false }
  );

  userRegisterError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userRegisterError),
      tap(({ message }) => {
        console.log(message.error)
        this.alertService.notification({
          message: message.error.description || 'რეგისტრაცია ვერ მოხერხდა',
          messageType: 'error',
        });
      })
    ), { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => logOutSuccess())
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logOutSuccess),
        map(() => {
          this.sessionStorage.destroyAll()
          globalThis.location.reload();
        })
      ),
    { dispatch: false }
  );
}
