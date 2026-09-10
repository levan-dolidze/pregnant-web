import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateToString'
})
export class DateToStringPipe extends DatePipe implements PipeTransform {

  override transform(value: any, args: any='yyyy-MM-dd'): any {
    if (!value) return;
    return super.transform(new Date(value),args);
  }
}


