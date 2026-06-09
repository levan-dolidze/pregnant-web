import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Alert } from './alert';
import { TranslationService } from 'src/app/shared/translate/translation.serive';


export interface AlertMessageParams {
  statusCode: number;
  methodName: string;
  showClose?: boolean
}

export type MessageType = 'alert' | 'UImsg';
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private readonly _snackBar: MatSnackBar) { }

  t = inject(TranslationService);

  notification({
    message,
    horizontalPosition = 'center',
    verticalPosition = 'top',
    messageType = 'success',
    duration = 6000,
    action,
    showClose = true
  }: {
    message: string;
    horizontalPosition?: MatSnackBarHorizontalPosition;
    verticalPosition?: MatSnackBarVerticalPosition;
    messageType?: 'success' | 'error' | 'warning';
    duration?: number;
    action?: string;
    showClose?: boolean;
  }) {
    const translatedMessage = this.t.translocoService.translate(message);

    let style = 'success-dialog';
    if (messageType === 'error') style = 'error-dialog';

    this._snackBar.openFromComponent(Alert, {
      data: { message: translatedMessage, messageType, showClose, action },
      horizontalPosition,
      verticalPosition,
      duration,
      panelClass: [style]
    });
  }

  errors = [
    {
      method: 'GetPersonalInfo',
      statusArr: [
        {
          statusCode: 0,
          message: 'Success',
        },
        {
          statusCode: -1,
          message: 'ვერ მოხერხდა მონაცემების გადამოწმება',
        },
        {
          statusCode: -14,
          message: 'ვერ მოხდა პიროვნების იდენტიფიკაცია, გთხოვ გადაამოწმო',
        },
      ],
    },
    {
      method: 'CreateOrUpdateContrahentSda',
      statusArr: [
        {
          statusCode: 0,
          message: 'OK',
        },
        {
          statusCode: -1,
          message: 'Unexpected_Error',
        },
        {
          statusCode: -2,
          message: 'Invalid_UserOrPass',
        },
        {
          statusCode: -15,
          message: 'Person_age_must_be_grater_than_18',
        },
        {
          statusCode: -39,
          message: 'Person_Not_Found',
        },
        {
          statusCode: -37,
          message: 'Insurer_is_AML_Black_List',
        },
        {
          statusCode: -38,
          message: 'Insured_is_AML_Black_List',
        },
        {
          statusCode: 504,
          message: 'Session_has_expiredt',
        },
        {
          statusCode: 400,
          message: 'Bed_request',
        },
      ],
    },
    {
      method: 'registerpremiumpolicies',
      statusArr: [
        {
          statusCode: -1,
          message: 'Unexpected_Error'
        },
        {
          statusCode: -2,
          message: 'Unexpected_Error'
        },
        {
          statusCode: -10,
          message: 'Policy_cannot_start_earlier_than_current_date'
        },
        {
          statusCode: -11,
          message: 'Policy_should_end_later_than_its_start'
        },
        {
          statusCode: -12,
          message: 'Policy_cannot_start_earlier_than_current_date'
        },
        {
          statusCode: -14,
          message: 'Policy_holder_age_must_be_grather_than_18'
        },
        {
          statusCode: -37,
          message: 'Insurer_is_AML_Black_List'
        },
        {
          statusCode: -38,
          message: 'Insured_is_AML_Black_List'
        },
      ]
    },
    {
      method: 'DeletePassportTemplate',
      statusArr: [
        {
          statusCode: 400,
          message: 'Traveler_Couldnot_Delete'
        },
      ]
    },
    {
      method: 'AddPassportTemplate',
      statusArr: [
        {
          statusCode: 400,
          message: 'Traveler_Couldnot_Save'
        },
      ]
    },
  ];

  alert(statusCode: number, method: string, showClose: boolean = true) {
    const params: AlertMessageParams = { methodName: method, statusCode: statusCode, showClose }
    const messageTxt = this.getMessageTxt(params)
    this.notification({ message: this.t.translocoService.translate(messageTxt), messageType: 'error', showClose })
  };

  getMessageTxt(alertTxtParams: AlertMessageParams) {
    const findMethod = this.errors.find(
      (x) => x.method === alertTxtParams.methodName
    );

    if (findMethod) {
      const findStatusCode = findMethod.statusArr.find(
        (x) => x.statusCode === alertTxtParams.statusCode
      );
      if (findStatusCode) {
        return findStatusCode.message;
      } else {
        return 'Common_error';
      }
    }
    return '';
  }

  dismiss() {
    this._snackBar.dismiss()
  }
}
