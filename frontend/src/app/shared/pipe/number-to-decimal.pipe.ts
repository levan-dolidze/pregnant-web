import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToDecimal'
})
export class NumberToDecimalPipe implements PipeTransform {

  transform(number: any): string {

    const formattedValue = parseFloat(number).toFixed(2)
    return `${formattedValue}`;
  }
};
