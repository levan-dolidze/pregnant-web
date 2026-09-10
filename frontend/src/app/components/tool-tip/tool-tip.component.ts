import { Component, EventEmitter, Input, OnInit, Output, ViewChild, WritableSignal } from '@angular/core';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { TooltipPosition } from '@angular/material/tooltip';
import { RepeatDirective } from 'src/app/shared/directives/repeat.directive';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss'],
  imports: [MatIconModule, RepeatDirective]
})
export class ToolTipComponent {



  selectedIndex: number;

  @Input() text: any
  @Input() gap: number = 30;
  @Input() repeatNumber: number
  @Input() position: TooltipPosition = 'above';
  @Output() onShow: EventEmitter<any> = new EventEmitter()

  @ViewChild('tooltip') tooltip: any;



  show(ev: any) {
    const id: number = parseInt((ev.currentTarget['id'] as string).slice(7));
    this.selectedIndex = id;
    this.onShow.next(id)
  }

}
