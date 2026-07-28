import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, LOCALE_ID, inject } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideTransloco } from '@jsverse/transloco';
import { DatePipe, registerLocaleData } from '@angular/common';
import { TranslocoHttpLoader } from './shared/translate/transloco-loader';
import { Languages } from './shared/translate/translation.serive';
import localeKa from '@angular/common/locales/ka';
import { MaterialModule } from './shared/shared-module/material.module';
import { errorInterceptor } from './core/interceptor/error.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CookieModule } from 'ngx-cookie';
import { stepKey, stepReducer } from './shared/state/step-state/step-reducers';
import { StepEffects } from './shared/state/step-state';
import { DateToStringPipe } from './shared/pipe/date-to-string.pipe';
import { httpInterceptor } from './core/interceptor/http.interceptor';
import { AuthEffects, authKey, authReducer } from './auth/data-access/state/auth';

function getStoredLang() {
  return sessionStorage.getItem('saLang')
    ? sessionStorage.getItem('saLang') as Languages
    : 'ka';
}

registerLocaleData(localeKa, 'ka');
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptors([errorInterceptor, httpInterceptor])),
    provideStore(),
    provideClientHydration(),
    importProvidersFrom(
      HttpClient,
      FormsModule,
      ReactiveFormsModule,
      MaterialModule,
      CookieModule.withOptions(),
    ),
    provideState({ name: stepKey, reducer: stepReducer }),
    provideState({ name: authKey, reducer: authReducer }),

    provideEffects([StepEffects,AuthEffects]),


    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
    provideTransloco({
      config: {
        availableLangs: ['ka', 'en'],
        defaultLang: getStoredLang(),
        reRenderOnLangChange: true,
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: LOCALE_ID,
      useValue: 'ka',
    },
    DatePipe,
    DateToStringPipe
  ],
};