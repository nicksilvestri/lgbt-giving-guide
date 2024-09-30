import { Component, OnInit } from '@angular/core';
import { OrgCard } from '../org-card/org-card.model';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GetGaysService } from "../get-gays.service";


@Component({
  selector: 'app-org-details-page',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './org-details-page.component.html',
  styleUrl: './org-details-page.component.scss'
})
export class OrgDetailsPageComponent {
  orgId: string;
  orgs: Array<OrgCard>;
  org: OrgCard;

  constructor(private route: ActivatedRoute, private getGaysService: GetGaysService) {
    this.orgId= '';
    this.orgs = [];
    this.org = { name: '', revenue: 0, primaryFocus: '' };

  }

  ngOnInit(): void {
    if (this.route?.snapshot?.paramMap?.get('id')) {
      this.orgId = this.route?.snapshot?.paramMap?.get('id') || '';
    };
    if (this.orgId) {
      this.getGaysService.getGays().subscribe(response => {
        this.orgs = this.getGaysService.formatGays(response);
        this.org = this.orgs.find(org => org.ein === this.orgId)!;
        console.log(this.org);
      });
    }
  }

}
