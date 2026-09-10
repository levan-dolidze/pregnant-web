import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { AppSettings } from './utils/config';
import { ScreenType } from './utils/models';
import { AppSettingsService } from 'src/app/shared/services/app-settings.service';
import { Languages, TranslationService } from 'src/app/shared/translate/translation.serive';
import { Store } from '@ngrx/store';
import { initAppParams } from 'src/app/shared/state/step-state';
import { SessionStorageService } from 'src/app/shared/services/session-storage.service';
import { TokenLoginResponse } from 'src/app/auth/ui/auth-models';
import { InitQueryParams } from 'src/app/shared/state/step-state/utils';
import { CourseId } from 'src/app/shared/utils/enums';

export class Query {
  user_id: string;
  mode: string;
  lang: Languages;
  courseId: CourseId
}

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  private readonly appSettingsService = inject(AppSettingsService);
  private readonly sessionStorageService = inject(SessionStorageService);
  // private readonly t = inject(TranslationService)

  options = this.appSettingsService.options();
  readonly screenTypeState = this.appSettingsService.screenTypeState

  @Input() query: string | undefined;

  protected readonly store = inject(Store);

  ngOnInit(): void {
    // this.init()
    // const query = this.sessionStorageService.getKey('query')
  }

  init() {
    const mode = this.sessionStorageService.getKey('mode')
    const quer = this.sessionStorageService.getKey('query')
    document.documentElement.setAttribute('theme', mode);
    const queryParams = quer

    if (queryParams) {
      const query = {
        token: queryParams.token,
        mode: mode,
        lang:'ka',
        user_id: queryParams.user_id,
        productId: queryParams.productId,
        currentStep:1
      } as InitQueryParams

      const tokenResponse = {
        tokenValue: query.token
      } as TokenLoginResponse

    }


  }


  // constructor() {
  //   this.appSettingsService.updateScreenType('mobile' as ScreenType);
  // }

  receiveOptions(options: AppSettings): void {
    this.options = options;
  }
}
