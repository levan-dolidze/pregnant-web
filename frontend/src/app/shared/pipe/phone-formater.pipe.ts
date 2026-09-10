import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneFormater'
})
export class PhoneFormaterPipe implements PipeTransform {

  transform(value: string | null): string {
    if (value) {
      const str = value.toString();
      return str.slice(0, 3) + ' ' + str.slice(3, 6) + ' ' + str.slice(6, 9);
    }
    else { return '' }
  }

}
