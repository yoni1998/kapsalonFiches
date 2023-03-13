import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nvt',
})
export class NvtPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? value : 'Niet Van Toepassing';
  }
}
