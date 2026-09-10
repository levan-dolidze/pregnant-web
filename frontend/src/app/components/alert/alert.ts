import { NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

export interface AlertModel {
  message: string;
  messageType?: 'success' | 'error' | 'warning';
  action?: string;
  showClose?: boolean
}
@Component({
  selector: 'lib-alert',
  imports: [NgClass],
  templateUrl: './alert.html',
  styleUrl: './alert.scss'
})
export class Alert {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data:AlertModel,
    private readonly snackBarRef: MatSnackBarRef<Alert>,
  ) {
  }

  onClose() {this.snackBarRef.dismiss()}
}
