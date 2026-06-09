import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from "@jsverse/transloco";
import { filter, map } from 'rxjs';
import { registerLocaleData } from '@angular/common';
import localeKa from '@angular/common/locales/ka';
import localeEn from '@angular/common/locales/en';
import { SessionStorageService } from '../services/session-storage.service';

export type Languages = 'ka' | 'en';

export interface LanguageTypes {
  code: Languages;
  icon: string;
}

export enum LanguagesEnum {
  Ka = 'ka',
  En = 'en'
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  readonly translocoService = inject(TranslocoService);
    readonly sessionStorage = inject(SessionStorageService)

  private readonly activeLangCode = signal<string>(
    this.translocoService.getActiveLang()
  );
  private readonly activeLang = signal<string>(
    `/assets/images/flag/icon-flag-${this.translocoService.getActiveLang()}.svg`
  );
  private readonly languages = signal<LanguageTypes[]>(this.getAvailableLangs());

  readonly activeLangCodeState = computed(this.activeLangCode);
  readonly activeLangState = computed(this.activeLang);
  readonly availableLangState = computed(this.languages);




  translationsLoaded = toSignal<boolean>(
    this.translocoService.events$.pipe(
      filter((event) => event.type === 'translationLoadSuccess'),
      map((event) => !!event)
    )
  );

  private getAvailableLangs(): LanguageTypes[] {
    return this.translocoService.getAvailableLangs().map((code) => ({
      code: code as Languages,
      icon: `/assets/images/flag/icon-flag-${code}.svg`,
    }));
  }

  public setActiveLanguage(languageTypes: LanguageTypes) {
    this.translocoService.setActiveLang(languageTypes.code);
    this.sessionStorage.saveKey('saLang', languageTypes.code);
    this.activeLang.update(() => languageTypes.icon);
    this.activeLangCode.update(() => languageTypes.code);

    if (languageTypes.code === 'ka') {
      registerLocaleData(localeKa, languageTypes.code);
    }
    if (languageTypes.code === 'en') {
      registerLocaleData(localeEn, languageTypes.code);
    }
  }
}
