import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'lib-loader',
  imports: [MatProgressSpinnerModule],
  template: ` <div class="loading-container">
    <ng-content />
    @if(loading){
 <div  [class]="className">
      <div class="blocker-inner">
        <mat-spinner class="mat-spinner" [diameter]="diameter"> </mat-spinner>
      </div>
    </div>
    }
   
  </div>`,
  styles: [
    `
@use 'variables' as *;

      :host {
        display: contents;
      }

      .loading-container {
        display: contents;
      }
      .blocker {
        position: fixed;
        height: 100vh;
        width: 100vw;
        z-index: 10000;
        top: 0;
        left: 0;
        backdrop-filter: blur(6px);
      .blocker-inner {
        .mat-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          -moz-transform: translateX(-50%) translateY(-50%);
          -webkit-transform: translateX(-50%) translateY(-50%);
          transform: translateX(-50%) translateY(-50%);
        }
      }
      }
      ::ng-deep {
        & .mat-mdc-progress-spinner {
          & .mdc-circular-progress__determinate-circle,
          & .mdc-circular-progress__indeterminate-circle-graphic {
            stroke: $primary !important;
          }
        }
      }
    `,
  ],
})
export class Loader {
  @Input() loading = false;
  @Input() diameter = '36';
  @Input() className = 'blocker'
}
