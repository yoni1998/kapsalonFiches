import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
})
export class DatePipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (!value) {
      return 'NVT';
    } else {
      return new Date(value?.seconds * 1000).toLocaleString();
    }
  }
}
