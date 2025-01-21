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
  focuses: Array<string>; 
  selectedFocus: string = "";
  headersToMap: Array<headersToMap>;

  constructor(private http: HttpClient) {
    this.focuses = [];
    this.displayedOrgs = [];
    this.headersToMap = [
      { headerName: 'NAME', keyInOrgCard: 'name' },
      { headerName: 'Website', keyInOrgCard: 'url' },
      { headerName: 'Mission', keyInOrgCard: 'mission' },
      { headerName: 'REVENUE_AMT', keyInOrgCard: 'revenue' },
      { headerName: 'Primary Focus 1', keyInOrgCard: 'primaryFocus' },
      { headerName: 'Primary Focus 2', keyInOrgCard: 'primaryFocus2' },
      { headerName: 'Primary Focus 3', keyInOrgCard: 'primaryFocus3' },
      { headerName: 'Primary Focus 4', keyInOrgCard: 'primaryFocus4' },
      { headerName: 'Primary Focus 5', keyInOrgCard: 'primaryFocus5' },
      { headerName: 'Secondary Focus 1', keyInOrgCard: 'secondaryFocus' },
      { headerName: 'Secondary Focus 2', keyInOrgCard: 'secondaryFocus2' },
      { headerName: 'Secondary Focus 3', keyInOrgCard: 'secondaryFocus3' },
      { headerName: 'Secondary Focus 4', keyInOrgCard: 'secondaryFocus4' },
      { headerName: 'Secondary Focus 5', keyInOrgCard: 'secondaryFocus5' },
      { headerName: 'EIN', keyInOrgCard: 'ein' },
      { headerName: 'CITY', keyInOrgCard: 'city' },
      { headerName: 'STATE', keyInOrgCard: 'state' },
      { headerName: 'RULING', keyInOrgCard: 'since' },
      { headerName: 'DEDUCTIBILITY', keyInOrgCard: 'deductability' },
      { headerName: 'Vision', keyInOrgCard: 'vision' },
      { headerName: 'Executive Director', keyInOrgCard: 'ed' },
      { headerName: 'State or National', keyInOrgCard: 'stateOrNational' },
      { headerName: 'Tre\'s Take', keyInOrgCard: 'tresTake' },
      { headerName: 'ProPublica Link', keyInOrgCard: 'propublicaLink' },
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
          
          // after the org is added to orgs, let's check if there are any focuses
          // that we haven't seen before
          [
            org.primaryFocus,
            org.primaryFocus2,
            org.primaryFocus3,
            org.primaryFocus4,
            org.primaryFocus5,
            org.secondaryFocus,
            org.secondaryFocus2,
            org.secondaryFocus3,
            org.secondaryFocus4,
            org.secondaryFocus5,
          ].forEach((foc)=>{
            if (foc && !this.focuses.includes(foc)) {
              this.focuses.push(foc);
            }
          });
        });
        return orgs;

  }

}
