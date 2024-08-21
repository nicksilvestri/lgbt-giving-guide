import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-detailed-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailed-table.component.html',
  styleUrl: './detailed-table.component.scss'
})
export class DetailedTableComponent {
  @Input({ required: true }) tableData!:[string,string][];

  constructor() {
  }

}
