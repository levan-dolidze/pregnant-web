import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lib-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})



export class LineComponent {
  @Input() width: number = 100;
  @Input() height: string = '1';
  @Input() margin: string = 'auto';
  @Input() className: string = '';

}
