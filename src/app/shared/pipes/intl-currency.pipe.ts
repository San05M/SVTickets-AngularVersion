import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'intlCurrency',
  standalone: true,
})
export class IntlCurrencyPipe implements PipeTransform {
  transform(price: number, currency: string, locale: string): string {
    return new Intl.NumberFormat(locale, {
      currency,
      style: 'currency',
    }).format(price);
  }
}