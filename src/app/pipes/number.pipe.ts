import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number',
})
export class NumberPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    if (value === 'NVT') {
      return 'NVT';
    }
    let stringValueNumber: string = value;
    let match = stringValueNumber.toString().match(/.{1,3}/g);
    let formattedNumber = match?.join(' ');
    return formattedNumber;
  }
}
