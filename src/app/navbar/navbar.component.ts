import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  constructor(
    private auth: AuthenticationService,
    private router: Router
    ) { }

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
