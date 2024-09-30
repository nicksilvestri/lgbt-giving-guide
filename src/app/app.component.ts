import { Component } from '@angular/core';
import { provideRouter, RouterOutlet } from '@angular/router';
import { OrgCardComponent } from "./org-card/org-card.component";
import { OrgCardListComponent } from "./org-card-list/org-card-list.component";
import { bootstrapApplication } from '@angular/platform-browser';
import { routes } from './app.routes';
import { CommonModule } from "@angular/common";
import { GetGaysService } from './get-gays.service';
import { provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, OrgCardComponent, OrgCardListComponent, CommonModule]
})
export class AppComponent {
  title = 'lgbt';
}

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient(), GetGaysService],
});
