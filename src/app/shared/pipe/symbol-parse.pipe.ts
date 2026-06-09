import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symbolParse'
})
export class SymbolParsePipe implements PipeTransform {

  transform(value: string | number, symbol: string): string {
    if (value == null || !symbol) return String(value);

    const strValue = String(value);

    const index = strValue.indexOf(symbol);

    if (index === -1) {
      return strValue + ' ' + symbol;
    }

    return strValue.slice(0, index + symbol.length) +
      strValue.slice(index + symbol.length).replaceAll(symbol, '');
  }


}
