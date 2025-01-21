import { OrgCardComponent } from "../org-card/org-card.component";
import { OrgCard } from '../org-card/org-card.model';
import { headersToMap } from './org-card-list.model';
import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { GetGaysService } from "../get-gays.service";

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
  focuses: Array<string>; 
  selectedFocus: string = "";
  loading: boolean;

  constructor( private getGaysService: GetGaysService) {
    this.orgs = [];
    this.displayedOrgs = [];
    this.focuses = [];
    this.loading = true;

    getGaysService.getGays().subscribe(response => {
      this.orgs = getGaysService.formatGays(response);
      this.displayedOrgs = JSON.parse(JSON.stringify(this.orgs));
      this.focuses = getGaysService.focuses;
      this.loading=false;
    });
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
        this.displayedOrgs =  JSON.parse(JSON.stringify(this.orgs))
        .filter(function(org: OrgCard){
          return filters.filter((foc) => [
            org.primaryFocus,
            org.primaryFocus2,
            org.primaryFocus3, 
            org.primaryFocus4, 
            org.primaryFocus5, 
            org.secondaryFocus, 
            org.secondaryFocus2, 
            org.secondaryFocus3, 
            org.secondaryFocus4, 
            org.secondaryFocus5 
          ].includes(foc)).length;
        })
    } else {
      this.displayedOrgs =  JSON.parse(JSON.stringify(this.orgs));
    }
    
  }
}
