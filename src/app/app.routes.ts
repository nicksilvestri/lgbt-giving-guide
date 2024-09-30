import { Routes } from '@angular/router';
import { OrgDetailsPageComponent } from './org-details-page/org-details-page.component';
import { OrgCardListComponent } from './org-card-list/org-card-list.component';

export const routes: Routes = [
    {
        path: '',
        component: OrgCardListComponent
    },
    {   
        path: ':id',
        component: OrgDetailsPageComponent
    }
];
