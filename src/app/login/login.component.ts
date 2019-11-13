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
  users: any[];

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
    ) {
      // Redirect to Dashboard if already logged in
      if (this.auth.currentUserValue) {
        this.router.navigate(['/dashboard']);
      }
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  // Convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

  signIn() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.controls;
    this.auth.login(email.value, password.value).subscribe(x => {
      this.router.navigate(['/dashboard']);
    });
  }

}
