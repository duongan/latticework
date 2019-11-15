import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  public searchUserInput: string;
  public search: any;

  constructor() {
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
}
