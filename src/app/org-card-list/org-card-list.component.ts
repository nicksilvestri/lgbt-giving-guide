import { OrgCardComponent } from "../org-card/org-card.component";
import { HttpClient } from '@angular/common/http';
import { OrgCard } from '../org-card/org-card.model';
import { headersToMap } from './org-card-list.model';
import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from "@angular/common";
// import { Select2Module } from 'ng2-select2-component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-org-card-list',
  standalone: true,
  imports: [OrgCardComponent, CommonModule, NgSelectModule, FormsModule],
  templateUrl: './org-card-list.component.html',
  styleUrl: './org-card-list.component.scss'
})
export class OrgCardListComponent {
  orgs: Array<OrgCard>;
  displayedOrgs: Array<OrgCard>;
  primaryFocuses: Array<string>; 
  selectedFocus: string = "";
  headersToMap: Array<headersToMap>;

  constructor(private http: HttpClient) {
    this.orgs = [];
    this.displayedOrgs = [];
    this.primaryFocuses = [];
    this.headersToMap = [
      { headerName: 'NAME', keyInOrgCard: 'name' },
      { headerName: 'Website', keyInOrgCard: 'url' },
      { headerName: 'Mission', keyInOrgCard: 'mission' },
      { headerName: 'REVENUE_AMT', keyInOrgCard: 'revenue' },
      { headerName: 'Primary Focus 1', keyInOrgCard: 'primaryFocus' }
    ];
    this.getGays();
  }

  getGays() {
    // FOR RUNNING LOCALLY POINT TO NODE SERVER SPECIFICALLY 
    //this.http.get<any>('http://localhost:3000/getGays', {}).subscribe(
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
          const org: OrgCard = {
            name: ''
          };
          this.headersToMap.forEach((header: headersToMap) => {
            const value = row[header.indexInSpreadsheet ? header.indexInSpreadsheet : 0];
            (org as any)[header.keyInOrgCard] = value;
          });
          this.orgs.push(org);
          // after the org is added to orgs, let's check if there are any primary focuses
          // that we haven't seen before
          if (org.primaryFocus && !this.primaryFocuses.includes(org.primaryFocus)) {
            this.primaryFocuses.push(org.primaryFocus);
            console.log(this.primaryFocuses);
          }
        });
        this.displayedOrgs=[...this.orgs];
      },
      (error) => {
        // Handle any errors here
        console.error(error);
      }
    );
  }

  sortOrgs(criteria: string) {
    switch (criteria) {
      case 'a-to-z':
        this.displayedOrgs.sort((a, b) => {
          if (a.name && b.name) {
            return a.name.localeCompare(b.name);
          }
          return 0;
        });
        break;
        case 'z-to-a':
          this.displayedOrgs.sort((a, b) => {
            if (a.name && b.name) {
              return b.name.localeCompare(a.name);
            }
            return 0;
          });
          break;
      case 'small-to-large':
        this.displayedOrgs.sort((a, b) => a.revenue!! && b.revenue!! ? a.revenue - b.revenue : 0);
        break;
      case 'large-to-small':
        this.displayedOrgs.sort((a, b) => a.revenue!! && b.revenue!! ? b.revenue - a.revenue : 0);
        break;
      default:
        break;
    }
  }

  filterOrgs (filters:string[]) {
    if (filters.length > 0){
      this.displayedOrgs =  JSON.parse(JSON.stringify(this.orgs)).filter((org: OrgCard) => filters.includes(org.primaryFocus || ''));
    } else {
      this.displayedOrgs =  JSON.parse(JSON.stringify(this.orgs));
    }
    
  }
}
