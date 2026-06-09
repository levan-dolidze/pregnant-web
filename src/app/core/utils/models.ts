import { ResponseNotificationEnum } from "./enums";

export abstract class ApiResponseBase<T> {
  // code = -1;
  // message = '';
  // data?: T;
  // loaded?:boolean
  value: T;
  statusCode:number;
  hasError: boolean;
  logNotifications: ResponseNotificationEnum[];
  displayNotifications: ResponseNotificationEnum[]
}



export enum ResponseStatus {
  Success = 200,
  Error = -9999
}