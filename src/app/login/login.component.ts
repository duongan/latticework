import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  errors: any;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
    ) {
      // Redirect to Dashboard if already logged in
      if (this.auth.currentUserValue) {
        this.router.navigate(['/dashboard']);
      }
      this.errors = this.auth.authErrors;
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      account: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

  signIn() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const { account, password } = this.loginForm.controls;
    this.auth.login(account.value, password.value).subscribe(token => {
      this.loading = false;
      if (token) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

}
