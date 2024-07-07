import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-org-card',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './org-card.component.html',
  styleUrl: './org-card.component.scss'
})
export class OrgCardComponent {
  constructor(private http: HttpClient) {
    // Make API call here
    this.getToken();
  }
  // ...

  callApi() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your_token_here'
    });

    this.http.get('https://sheets.googleapis.com/v4/spreadsheets/1FLghqVBFAJKKiyhfO4yqTyiEHwjwDaaZIB8MMVsd_8c/values/Sheet1!A1:D5', { headers }).subscribe((response) => {
      // Handle the API response here
      console.log(response);
    }, (error) => {
      // Handle any errors here
      console.error(error);
    });
  }

  getToken() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams();
    body.set('client_id', '506070184600-60tid16s9lk702h8q2kqnb9tv05uav9c.apps.googleusercontent.com');
    body.set('redirect_uri', 'https://nicksilvestri.github.io');
    body.set('response_type', 'token');
    body.set('scope', 'https://www.googleapis.com/auth/spreadsheets.readonly');

    this.http.post('https://accounts.google.com/o/oauth2/v2/auth', body.toString(), { headers }).subscribe((response) => {
      // Handle the token response here
      console.log(response);
    }, (error) => {
      // Handle any errors here
      console.error(error);
    });
  }
}
