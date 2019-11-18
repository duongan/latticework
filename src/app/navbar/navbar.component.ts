import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isMenuCollapsed = true;
  public searchUserInput: string;
  public search: any;

  constructor(private auth: AuthenticationService) {
    const names = [
      'anh.ha@terralogic.com',
      'duong.an@terralogic.com',
      'aaric.nguyen@terralogic.com'
    ];
    this.search = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map((term: string) =>
          term.length < 2
            ? []
            : names
                .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
                .slice(0, 10)
        )
      );
  }

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }
}
