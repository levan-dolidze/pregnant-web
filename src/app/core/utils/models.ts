import { ResponseNotificationEnum } from "./enums";

export abstract class ApiResponseBase<T = {}> {
  success: boolean;
  result: HttpResult;
  data?: T;
  loaded?: boolean
}


export interface HttpResult {
  code: number,
  description: string
}


export enum ResponseStatus {
  Success = 1,
  Error = -9999
}