import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage>(
  "globalThis local storage object",
  {
    providedIn: "root",
    factory: () => {
      return inject(PLATFORM_ID) === "browser"
        ? globalThis.localStorage
        : ({} as Storage);
    },
  }
);


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

 readonly  storage = inject(LOCAL_STORAGE);

isJSON(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}


  getKey(key: string) {

    if (this.storage[key]?.length) {
      return this.isJSON(globalThis.localStorage[key]) ? JSON.parse(globalThis.localStorage[key]) : globalThis.localStorage[key]
    }
  }

  saveKey(key: string, value: string) {
    this.storage[key] = JSON.stringify(value);
  }

  destroyKey(key: string) {
    if(key){
    this.storage.removeItem(key);
    }
  }
}
