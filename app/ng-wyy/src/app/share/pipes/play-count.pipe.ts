import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playCount',
})
export class PlayCountPipe implements PipeTransform {
  transform(value: number, args?: any): number | string {
    const maxNum: number = 10000;
    return value > maxNum
      ? `${Math.floor(value / maxNum)}万`
      : value;
  }
}
