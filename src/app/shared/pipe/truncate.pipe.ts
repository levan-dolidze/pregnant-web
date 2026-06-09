import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: number, total: number | undefined, maxViewIndex: number): null | string {

    if (total && total > maxViewIndex && value !== total - 1) {
      return `...\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${total}`
    }
    return null
  }

}
