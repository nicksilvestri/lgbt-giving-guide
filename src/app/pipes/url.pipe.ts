import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'url',
  standalone: true
})
export class UrlPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    const strippedValue = value.replace(/^(https?:\/\/)?(www\.)?/i, '').replace(/\/.*/, '');
    return strippedValue;
  }

}
