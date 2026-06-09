import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Translation, TranslocoLoader } from "@jsverse/transloco";

const APP_VERSION = '1.0'; 

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private readonly http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(
      `/assets/i18n/${lang}.json?v=${APP_VERSION}`
    );
  }
}