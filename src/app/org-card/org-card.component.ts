import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { OrgCard } from './org-card.model';
import { CommonModule } from "@angular/common";
import { UrlPipe } from '../pipes/url.pipe';
import { IdPipe } from '../pipes/id.pipe';  

@Component({
  selector: 'app-org-card',
  standalone: true,
  imports: [HttpClientModule, CommonModule, UrlPipe, IdPipe],
  templateUrl: './org-card.component.html',
  styleUrl: './org-card.component.scss'
})


export class OrgCardComponent {


  @Input({ required: true }) org!: OrgCard;

  expanded = false;

    constructor() {
    }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }
  
}
