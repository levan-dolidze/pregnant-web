import { computed, inject, Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { AppSettings, defaults } from '../layout/utils/config';


@Injectable({
  providedIn: 'root',
})
export class CoreService {


  private optionsVal = signal<any>(defaults);
  public options = computed(this.optionsVal);

  getDefaultOptions() {
    return of(defaults);
  }

  setOptions(options: AppSettings) {
    this.optionsVal.update((x) => (x = Object.assign(defaults, options)));
  }

  public setActiveMode(mode: string) {
    // this.optionsVal.update((value) =>
    //   value.map((x: any) => ({ ...x, theme: mode }))
    // );
    this.optionsVal.update((x) => (x = Object.assign(defaults, { theme: mode })));
  }

}
