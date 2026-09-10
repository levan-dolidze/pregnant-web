import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { initAppParams, loadAppStoredParams} from './step-actions';
import { Store } from '@ngrx/store';
import { SessionStorageService } from '../../services/session-storage.service';
import { LanguagesEnum, TranslationService } from '../../translate/translation.serive';
import { TokenLoginResponse } from 'src/app/auth/ui/auth-models';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtService } from 'src/app/auth/data-access/jwt.service';
import { InitQueryParams } from './utils';
import { CourseId } from '../../utils/enums';


@Injectable()
export class StepEffects {

    protected readonly store = inject(Store);
    protected readonly route = inject(ActivatedRoute);
    protected readonly router = inject(Router);
    private readonly actions$ = inject(Actions);
    readonly sessionStorage = inject(SessionStorageService)
    private readonly t = inject(TranslationService)
    private readonly jwtService = inject(JwtService)

    initParamsState$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(initAppParams),
                map(({ tokenRequest, query }) => {
                    console.debug(tokenRequest);
                    document.documentElement.setAttribute('theme', query.mode);
                    this.sessionStorage.saveKey('mode', query.mode);
                    return loadAppStoredParams({ tokenRequest,query })
                })
            ),
    );



    private readonly urls = [
        {
            pageName: 'travel',
            path: ['/travel'],
            courseId: CourseId.PregnantOnline,
        },
        {
            pageName: 'travel',
            path: ['/travel'],
            courseId: CourseId.PregnantGuide,
        },
    ];

    navigate(courseId: CourseId) {

        const matchingUrl = this.urls.find(
            step => step.courseId === courseId);

        console.debug(matchingUrl)

        // if (!matchingUrl) return;
        // this.router.navigate([
        //     ...matchingUrl.path, pageName, courseId, this.guidService.uuid,
        // ]);
    }

}