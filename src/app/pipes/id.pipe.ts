import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'id',
  standalone: true
})
export class IdPipe implements PipeTransform {

  transform(value: string): string {
    return value.trim().replace(/\s+/g, '').toLowerCase();
  }

}
