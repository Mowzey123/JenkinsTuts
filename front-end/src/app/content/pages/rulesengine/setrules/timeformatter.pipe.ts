import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformatter'
})
export class TimeformatterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return null;
    let hour  = value;
    const part = hour > 12 ? 'pm' : 'am';
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour + ':00' + '').length === 1 ? `0${hour}` : hour;
    return `${hour}` + ':00 ' + `${part}`;
  }

}
