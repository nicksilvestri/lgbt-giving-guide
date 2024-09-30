import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrgCard } from './org-card/org-card.model';
import { headersToMap } from './org-card-list/org-card-list.model';
import { Observable, Subscribable } from 'rxjs';
import { forEach } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GetGaysService {

  displayedOrgs: Array<OrgCard>;
  primaryFocuses: Array<string>; 
  selectedFocus: string = "";
  headersToMap: Array<headersToMap>;

  constructor(private http: HttpClient) {
    this.primaryFocuses = [];
    this.displayedOrgs = [];
    this.headersToMap = [
      { headerName: 'NAME', keyInOrgCard: 'name' },
      { headerName: 'Website', keyInOrgCard: 'url' },
      { headerName: 'Mission', keyInOrgCard: 'mission' },
      { headerName: 'REVENUE_AMT', keyInOrgCard: 'revenue' },
      { headerName: 'Primary Focus 1', keyInOrgCard: 'primaryFocus' },
      { headerName: 'EIN', keyInOrgCard: 'ein' },
      { headerName: 'CITY', keyInOrgCard: 'city' },
      { headerName: 'STATE', keyInOrgCard: 'state' },
      { headerName: 'RULING', keyInOrgCard: 'since' },
      { headerName: 'DEDUCTIBILITY', keyInOrgCard: 'deductability' },
    ];
   }

   getGays(): Observable<Array<OrgCard>> {
    const orgs: Array<OrgCard> = [];

    // FOR RUNNING LOCALLY POINT TO NODE SERVER SPECIFICALLY 
    //return this.http.get<any>('http://localhost:3000/getGays', {});
    return this.http.get<any>('/getGays', {})
   }


   formatGays(response: any): Array<OrgCard> {

    const orgs: Array<OrgCard> = [];

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
            name: '',
            ein: ''
          };
          this.headersToMap.forEach((header: headersToMap) => {
            const value = row[header.indexInSpreadsheet ? header.indexInSpreadsheet : 0];
            (org as any)[header.keyInOrgCard] = value;
          });
          orgs.push(org);
          // after the org is added to orgs, let's check if there are any primary focuses
          // that we haven't seen before
          if (org.primaryFocus && !this.primaryFocuses.includes(org.primaryFocus)) {
            this.primaryFocuses.push(org.primaryFocus);
          }
        });
        return orgs;

  }

}
