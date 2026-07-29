import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StepRoutes } from '../step-helper/utils/models';

@Component({
  selector: 'lib-mini-progress-bar',
  imports: [NgClass],
  templateUrl: './mini-progress-bar.html',
  styleUrl: './mini-progress-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MiniProgressBar {
  readonly routes = input<Array<StepRoutes>>([]);
  readonly currentStep = input<number>(1);

}
