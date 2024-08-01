import { OrgCardComponent } from "../org-card/org-card.component";
import { HttpClient } from '@angular/common/http';
import { OrgCard } from '../org-card/org-card.model';
import { headersToMap } from './org-card-list.model';
import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-org-card-list',
  standalone: true,
  imports: [OrgCardComponent, CommonModule],
  templateUrl: './org-card-list.component.html',
  styleUrl: './org-card-list.component.scss'
})
export class OrgCardListComponent {
  orgs: Array<OrgCard> = []; 
  headersToMap: Array<headersToMap>;

  constructor(private http: HttpClient) {
    this.orgs = [];
    this.headersToMap = [
      {headerName: 'NAME', keyInOrgCard: 'name'},
      {headerName: 'Website', keyInOrgCard: 'url'},
      {headerName: 'Mission', keyInOrgCard: 'mission'},
      {headerName: 'REVENUE_AMT', keyInOrgCard: 'revenue'}
    ];
    this.getGays();
  }

  getGays() {
    this.http.get<any>('/getGays', {}).subscribe(
      (response) => {
        // Remove first row from response, and store it in headerRow
        let headerRow = response.data.shift();

        // First iterate over response to set indexInSpreadsheet for each header
        this.headersToMap.forEach((header) => {
          const index = headerRow.findIndex((headerName: string) => headerName.trim() === header.headerName);
          //indexOf(header.headerName);
          if (index !== -1) {
            header.indexInSpreadsheet = index;
          }
          else {
            console.error(`Header ${header.headerName} not found in response`)
            console.log(headerRow);
          };
        });

        // Then iterate over response to create orgs
        response.data.forEach((row: any[]) => {
          const org: OrgCard = {};
          this.headersToMap.forEach((header: headersToMap) => {
            const value = row[header.indexInSpreadsheet ? header.indexInSpreadsheet : 0];
            (org as any)[header.keyInOrgCard] = value;
          });
          this.orgs.push(org);
        });
      },
      (error) => {
        // Handle any errors here
        console.error(error);
      }
    );
  }
}
