import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

let myuuid = uuidv4();


@Injectable({
  providedIn: 'root'
})
export class GuidService {

  get getUUID() {
    return myuuid
  }

readonly uuid = uuidv4();
}
