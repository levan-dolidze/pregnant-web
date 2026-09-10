import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatePickerService {

  datePikerSignal = signal<any>(null);
  datePikerSignalState = computed(() => this.datePikerSignal())
}
