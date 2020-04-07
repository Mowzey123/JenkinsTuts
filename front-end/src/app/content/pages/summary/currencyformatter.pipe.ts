import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyformatter'
})
export class CurrencyformatterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      return value.substr(0, 3) + ' ' + value.substr(3, value.length);
  }

}
