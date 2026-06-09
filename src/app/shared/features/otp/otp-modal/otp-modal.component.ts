import { Component, Inject, Optional, Signal } from '@angular/core';
import { OtpComponent } from '../otp.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-otp-modal',
  imports: [OtpComponent,TranslocoModule],
  templateUrl: './otp-modal.component.html',
  styleUrl: './otp-modal.component.scss'
})
export class OtpModalComponent  {

  constructor(@Optional() public dialogRef: MatDialogRef<OtpModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {otpDialogModel:Signal<any>}) {
  }



  confirmOtp(otp: string) {

  }

  onClose() {
    this.dialogRef.close()
  }


}
