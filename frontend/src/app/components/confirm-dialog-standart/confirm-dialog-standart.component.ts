import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoModule } from '@jsverse/transloco';
import { ButtonComponent } from '../button/button.component';

export class AsyncDialogModel {
  p1: string;
  title: string;
  isOpen: boolean;
  result: 'success' | 'cancel' | 'close' | 'init' = 'init'
  btnTxt?: string;
  outlineTitle: string;
  cssClass: string
}
export class ConfirmDialogModel {
  message: string;
  title: string;
  isOpen: boolean;
  result: 'success' | 'cancel' | 'close' | 'init';
  actionType: 'init' | 'delete';
  messageType?: 'success' | 'error' | 'info' | 'warning';
  confirmBtn: string;
  rejectBtn: string;
  subMessage?: string;
  params?: AsyncDialogModel
}

@Component({
  selector: 'app-confirm-dialog-standart',
  imports: [TranslocoModule, NgOptimizedImage, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
 <ng-container *transloco="let t">

 <div class="dialog">

  <div class="dialog__header">
    <div class="dialog__close" (click)="onClose()">
      <img
        ngSrc="assets/icons/_close-outline.svg"
        width="30"
        height="30"
        alt="Close"
      />
    </div>
  </div>

  <div class="dialog__content">

    <img
      class="dialog__icon"
      ngSrc="assets/icons/_confirm.svg"
      width="26"
      height="26"
      alt="Icon"
    />

    <div class="dialog__title">
      <h2>{{ t(data.title) }}</h2>
    </div>

    <div class="dialog__message">
      {{ t(data.message) }}
    </div>
  </div>

  <div class="dialog__actions">
      <app-button
        [text]="t(data.confirmBtn)"
        (btnClick)="onConfirm()"
        [className]="'h-40'">
      </app-button>
      <app-button
        [className]="'stroked-fill transparent h-40'"
        [text]="t(data.rejectBtn)"
        (btnClick)="onCancel()">
      </app-button>
  </div>

</div>
</ng-container>
 `,
  styleUrl: './confirm-dialog-standart.component.scss'
})
export class ConfirmDialogStandartComponent {
  constructor(
    @Optional() public dialogRef: MatDialogRef<ConfirmDialogStandartComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: ConfirmDialogModel
  ) {

  }

  onConfirm() {
    this.dialogRef.close(
      {
        result: 'confirm',
        params: this.data.params
      }
    );
  }

  onCancel() {
    this.onClose()
  }
  onClose() {

    this.dialogRef.close(
      {
        result: 'cancel',
        params: this.data.params
      }
    );
  }
}
