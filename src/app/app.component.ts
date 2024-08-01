import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrgCardComponent } from "./org-card/org-card.component";
import { OrgCardListComponent } from "./org-card-list/org-card-list.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, OrgCardComponent, OrgCardListComponent]
})
export class AppComponent {
  title = 'lgbt';
}
