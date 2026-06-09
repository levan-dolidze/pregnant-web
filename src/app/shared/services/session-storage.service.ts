import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }


  isJSON(str: any) {

    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  getKey(key: string) {

    if (globalThis.sessionStorage[key]?.length) {
      return this.isJSON(globalThis.sessionStorage[key]) ? JSON.parse(globalThis.sessionStorage[key]) : globalThis.sessionStorage[key]
    }
    return
  }

  saveKey(key: string, value: string | any) {
    globalThis.sessionStorage[key] = value;
  }

  destroyKey(key: string) {
    globalThis.sessionStorage.removeItem(key);
  }

  destroyAll(){
    globalThis.sessionStorage.clear()
  }
}
