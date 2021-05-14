import { Pipe, PipeTransform } from '@angular/core';
import {DateTime} from 'luxon'

@Pipe({
  name: 'formatToDate'
})
export class FormatToDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value) {return '';}

    const dt = DateTime.fromISO(value);

    // const defaultFormat = 'DD-MM-YYYY hh:mm:ss';
    let format = args[0] || {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'};
    const locale = args[1] || 'el';

    return dt.setLocale(locale).toLocaleString(format);
  }

}
