import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  catchError
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

  constructor(
    private auth: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit() {
    const catchErr = catchError(() => {
      console.error('User not found');
      return of([]);
    });
    this.search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => (this.loading = true)),
        switchMap((term: string) =>
          this.userService.searchUser(term).pipe(catchErr)
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
    this.userService.getUserDetail(email).subscribe(() => {
      this.loading = false;
    });
  }
}
