import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prijs',
})
export class PrijsPipe implements PipeTransform {
  transform(value: number | undefined, ...args: unknown[]): unknown {
    if (!value) {
      return '';
    } else {
      return '€ ' + value;
    }
  }
}
