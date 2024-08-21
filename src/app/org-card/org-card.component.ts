import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { OrgCard } from './org-card.model';
import { CommonModule } from "@angular/common";
import { UrlPipe } from '../pipes/url.pipe';
import { IdPipe } from '../pipes/id.pipe';  
import { DetailedTableComponent } from '../detailed-table/detailed-table.component';
import { MonthYearPipe } from '../pipes/month-year.pipe';

@Component({
  selector: 'app-org-card',
  standalone: true,
  imports: [HttpClientModule, CommonModule, UrlPipe, IdPipe, DetailedTableComponent, MonthYearPipe],
  templateUrl: './org-card.component.html',
  styleUrl: './org-card.component.scss'
})


export class OrgCardComponent implements OnInit {


  @Input({ required: true }) org!: OrgCard;
  irsData: Array<[string, string]> = [];
  private monthYearPipe = new MonthYearPipe();
  expanded = false;

    constructor() {
      

    }
    ngOnInit() {
      console.log(this.org);
      this.buildIRSTable();
    }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  buildIRSTable() {
    console.log(this.org);
    this.irsData = [
      ['EIN', this.org.ein || ""],
      ['Nonprofit status since', this.monthYearPipe.transform(this.org.since || "")],
    ];
  }
  
}
