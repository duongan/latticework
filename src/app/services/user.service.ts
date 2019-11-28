import { Injectable } from '@angular/core';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import {
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap
} from 'rxjs/operators';
import { HttpService } from './http.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: Array<any>;
  private userList$ = new Subject<Array<any>>();
  private selectedUser$ = new Subject<any>();
  constructor(private http: HttpService, private urlService: UrlService) {
    const cache = localStorage.getItem('users');
    if (cache) {
      this.users = JSON.parse(cache);
    } else {
      this.users = [];
    }
    this.userList$.next(this.users);
  }

  get userList(): Observable<Array<any>> {
    return this.userList$.asObservable();
  }

  get currentUser(): Observable<any> {
    return this.selectedUser$.asObservable();
  }

  searchUser(identity: string): Observable<any> {
    if (!identity.trim()) {
      return of({});
    }
    return this.http
      .get<any>(this.urlService.get('userSearch', { identity }))
      .pipe(map(res => res.data));
  }

  getUserDetail(email: string, refresh?: boolean): void {
    const index = this.users.findIndex(item => item.email === email);
    if (refresh || index === -1) {
      this.http
        .get<any>(this.urlService.get('userDetail', { email }))
        .subscribe(res => this.updateStorage(res, email, index, refresh));
    }
    this.selectedUser$.next(this.users[index]);
  }

  private updateStorage(
    res: any,
    email: string,
    index: number,
    refresh?: boolean
  ): void {
    const obj = {
      email,
      ...res
    };
    if (refresh && index) {
      this.users.splice(index, 1);
    }
    this.selectedUser$.next(obj);
    this.users.push(obj);
    this.userList$.next(this.users);
    localStorage.setItem('users', JSON.stringify(this.users));
  }
}
