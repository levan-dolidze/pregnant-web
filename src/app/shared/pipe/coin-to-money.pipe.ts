import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coinToMoney'
})
export class CoinToMoneyPipe implements PipeTransform {

  transform(coin: number): number | string {
    if (coin) {
      const money = coin / 100
      return money;
    }
    return 0

  };
};
