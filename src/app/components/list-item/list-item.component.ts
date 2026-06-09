import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { Component, inject, Input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule } from '@jsverse/transloco';
import { Store } from '@ngrx/store';
import {  modeState } from 'src/app/shared/state/step-state/step-selectors';


export interface ListItem {
  name: string;
  subName: string;
  icon: string;
}

@Component({
  selector: 'app-list-item',
  imports: [TranslocoModule, NgOptimizedImage,JsonPipe],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.scss'
})
export class ListItemComponent {

  @Input() listItem: any[] = [];
  listItemEmitted = output<unknown>();
  readonly store = inject(Store);

  readonly modeState = toSignal(this.store.select(modeState)) 

  

  onItemClick(item: unknown) {
    this.listItemEmitted.emit(item);
  }
}
