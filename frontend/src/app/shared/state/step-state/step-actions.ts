import { createAction, props } from '@ngrx/store';
import { InitQueryParams } from './utils';
import { TokenLoginRequest } from 'src/app/auth/ui/auth-models';

export const initAppParams = createAction(
    '[Step] Init App Params',
    props<{ tokenRequest: TokenLoginRequest; query?: InitQueryParams }>()
);

export const loadAppStoredParams = createAction(
    '[Step] Load App Stored Params Params',
    props<{ tokenRequest: TokenLoginRequest, query?: InitQueryParams }>()
);


export const goTo = createAction(
    '[Step] Go Next Init',
    props<{ step: number }>()
);








