import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortNum'
})
export class ShortNumPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
