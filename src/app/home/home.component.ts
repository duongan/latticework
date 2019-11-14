import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.auth.logout();
  }
}
