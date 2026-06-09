import { computed, inject, Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { AppSettings, defaults } from 'src/app/components/layout/utils/config';
import { ScreenType } from 'src/app/components/layout/utils/models';


@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {

  readonly localStorage = inject(LocalStorageService);

  private readonly optionsVal = signal<AppSettings>(defaults);
  public readonly options = computed(this.optionsVal);

  
  private readonly screenType =signal<ScreenType>('desktop');
  public readonly screenTypeState =computed(this.screenType);

  getDefaultOptions() {
    return of(defaults);
  }



setOptions(options: AppSettings) {
  this.optionsVal.update(() => ({ ...defaults, ...options }));
}



  public setActiveMode(mode: string) {
    this.localStorage.saveKey('mode', mode);
    this.optionsVal.update(() => ({ ...defaults, theme: mode }));
    
  }

  updateScreenType(screenType:ScreenType){
    this.screenType.set(screenType)
  }
}
