import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthYear',
  standalone: true
})
export class MonthYearPipe implements PipeTransform {

  private months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  transform(value: string): string {
    if (!value || value.length !== 6) {
      return value; // Return the original value if it's not in the expected format
    }

    const year = value.substring(0, 4);
    const monthIndex = parseInt(value.substring(4, 6), 10) - 1;

    if (monthIndex < 0 || monthIndex > 11) {
      return value; // Return the original value if the month is invalid
    }

    const month = this.months[monthIndex];
    return `${month} ${year}`;
  }
}