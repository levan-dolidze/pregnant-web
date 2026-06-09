import { Pipe, PipeTransform } from '@angular/core';

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GEL: '₾',
  GBP: '£',
  JPY: '¥',
  CHF: 'Fr',
  CAD: 'CA$',
  AUD: 'A$',
  RUB: '₽',
  TRY: '₺',
  UAH: '₴',
  AMD: '֏',
  AZN: '₼',
  CNY: '¥',
  INR: '₹',
  KRW: '₩',
  BRL: 'R$',
  MXN: 'MX$',
  SEK: 'kr',
  NOK: 'kr',
  DKK: 'kr',
  PLN: 'zł',
  CZK: 'Kč',
  HUF: 'Ft',
  RON: 'lei',
  BGN: 'лв',
  HRK: 'kn',
  ISK: 'kr',
  SGD: 'S$',
  HKD: 'HK$',
  NZD: 'NZ$',
  ZAR: 'R',
  EGP: '£',
  SAR: '﷼',
  AED: 'د.إ',
  ILS: '₪',
  THB: '฿',
  IDR: 'Rp',
  MYR: 'RM',
  PHP: '₱',
  VND: '₫',
  PKR: '₨',
  BDT: '৳',
};

@Pipe({
  name: 'currencySymbol',
})
export class CurrencySymbolPipe implements PipeTransform {
  transform(currencyCode: string | null | undefined): string {
    if (!currencyCode) return '';
    return CURRENCY_SYMBOLS[currencyCode.toUpperCase()] ?? currencyCode;
  }
}