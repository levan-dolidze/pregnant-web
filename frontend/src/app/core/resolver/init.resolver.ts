import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { TokenLoginRequest } from 'src/app/auth/ui/auth-models';
import { ScreenType } from 'src/app/components/layout/utils/models';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { initAppParams } from 'src/app/shared/state/step-state';
import { Mode } from 'src/app/shared/state/step-state/utils';


export const initResolver: ResolveFn<boolean> = (route, state) => {

  const store = inject(Store);
  const appService = inject(AppSettingsService);
  console.log(performance.now())

  appService.updateScreenType('mobile' as ScreenType);

  // const query = route.queryParams['query'];
  // console.log(query)
  console.log(route)
  console.log(state)

  const shortToken = route.paramMap.get('token');
  const mode = route.paramMap.get('mode');

  const tokenRequest = {
    token: shortToken
  } as TokenLoginRequest

  const queryParams = {
    mode: mode as Mode
  }

  store.dispatch(initAppParams({ tokenRequest, query: queryParams }))

  return true;
};
