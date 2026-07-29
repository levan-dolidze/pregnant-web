import { Component, Input, output } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-button',
  imports: [
    TranslocoModule,
    MatProgressSpinner,
  ],
  styleUrls: ['./button.component.scss'],
  template: `
    <ng-container *transloco="let t">

      <button
        class="btn {{ className }}"
        [style.width]="width + '%'"
        [style.width]="widthPx + 'px'"
        [style.cursor]="cursor"
        [type]="type"
        [disabled]="isDisabled || isLoading"
        (click)="onClick()">
      
        @if(isLoading) {
        <mat-spinner class="mat-spinner" [diameter]="'32'"> </mat-spinner>
        }
        @else {
          <div class="content">
             <ng-content>
             </ng-content>

           <div >{{ t(text)  }}</div>
           
           @if(customIconRight){
            <a (click)="onIconClick($event)" tabindex="0">
            <img [width]="customIconWidth" [height]="customIconHeight" [src]="customIconRight" alt='button'/>
            </a>
           }
           
          </div>
      }
      </button>
      
    </ng-container>
  `,
})
export class ButtonComponent {
  @Input() text: string;
  @Input() className = '';
  @Input() isDisabled: boolean;
  @Input() type = 'button';
  @Input() width = '100';
  @Input() widthPx = '';
  @Input() icon!: string;
  @Input() customIconLeft!: string;
  @Input() customIconRight!: string;
  @Input() isIconClick!: boolean;
  @Input() isLoading: boolean | null = false;
  @Input() cursor: string;
  @Input() customIconWidth = 16
  @Input() customIconHeight = 16

  btnClick = output<void>();
  iconClick = output<void>();

  onClick() {
    this.btnClick.emit();
  }
  
  onIconClick(event: MouseEvent) {
    if(this.customIconLeft&&this.isIconClick){
      this.iconClick.emit();
       event.stopPropagation()
    }
  }
}
