import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { AppSettings, defaults } from 'src/app/components/layout/utils/config';
import { ScreenType } from 'src/app/components/layout/utils/models';


@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {

  readonly localStorage = inject(LocalStorageService);
  private readonly platformId = inject(PLATFORM_ID);

  private readonly optionsVal = signal<AppSettings>(this.getInitialOptions());
  public readonly options = computed(this.optionsVal);


  private readonly screenType =signal<ScreenType>('desktop');
  public readonly screenTypeState =computed(this.screenType);

  constructor() {
    this.applyTheme(this.optionsVal().theme);
  }

  private getInitialOptions(): AppSettings {
    const storedMode = this.localStorage.getKey('mode');
    const theme = storedMode === 'dark' || storedMode === 'light' ? storedMode : defaults.theme;
    return { ...defaults, theme };
  }

  private applyTheme(mode: string) {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('theme', mode);
    }
  }

  getDefaultOptions() {
    return of(defaults);
  }



setOptions(options: AppSettings) {
  this.optionsVal.update(() => ({ ...defaults, ...options }));
}



  public setActiveMode(mode: string) {
    this.localStorage.saveKey('mode', mode);
    this.optionsVal.update(() => ({ ...defaults, theme: mode }));
    this.applyTheme(mode);
  }

  updateScreenType(screenType:ScreenType){
    this.screenType.set(screenType)
  }
}
