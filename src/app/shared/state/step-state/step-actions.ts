import { createAction, props } from '@ngrx/store';
import { InitQueryParams } from './utils';
import { TokenLoginRequest } from 'src/app/auth/ui/auth-models';

export const initAppParams = createAction(
    '[InitAppParams] Init App Params',
    props<{ tokenRequest: TokenLoginRequest; query?: InitQueryParams }>()
);

export const loadAppStoredParams = createAction(
    '[InitAppParams] Load App Stored Params Params',
    props<{ tokenRequest: TokenLoginRequest, query?: InitQueryParams }>()
);







