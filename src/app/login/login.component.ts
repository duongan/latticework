import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: any[];

  constructor(
    private auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
    if (this.auth.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  signIn(email: string, password: string) {
    this.auth.login(email, password).subscribe(x => {
      this.router.navigate(['/dashboard']);
    });
  }

}
