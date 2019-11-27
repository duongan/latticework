import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  public searchUserInput: string;
  public search: any;
  public loading = false;
  public currentUser: any = null;

  constructor(
    private auth: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(this.auth.currentUserValue);
    this.search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap((term: string) =>
          term ? this.userService.searchUser(term) : of(null)
        ),
        tap(() => (this.loading = false))
      );
  }

  logout() {
    this.auth.logout();
  }

  searchUser() {
    const email = this.searchUserInput ? this.searchUserInput.trim() : null;
    if (!email) {
      return;
    }

    this.loading = true;
    this.userService.getUserDetail(email).subscribe(res => {
      this.loading = false;
      console.log(res);
    });
  }
}
