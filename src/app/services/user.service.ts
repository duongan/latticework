import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpService } from './http.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: Array<any>;
  private userList$: BehaviorSubject<Array<any>>;
  private selectedUser$: BehaviorSubject<any>;
  private selectedSideBarItem: string = null;

  constructor(private http: HttpService, private urlService: UrlService) {
    const cache = localStorage.getItem('users');
    if (cache) {
      this.users = JSON.parse(cache);
    } else {
      this.users = [];
    }
    this.userList$ = new BehaviorSubject(this.users);
    this.selectedUser$ = new BehaviorSubject({});
  }

  get userList(): Observable<Array<any>> {
    return this.userList$.asObservable();
  }

  get currentUser(): Observable<any> {
    return this.selectedUser$.asObservable();
  }

  searchUser(identity: string): Observable<any> {
    if (!identity.trim()) {
      return of([]);
    }
    return this.http
      .get<any>(this.urlService.get('userSearch', { identity }))
      .pipe(map(res => res.data));
  }

  getUserDetail(email: string, refresh?: boolean): Observable<any> {
    const index = this.users.findIndex(item => item.email === email);
    if (refresh || index === -1) {
      return this.http
        .get<any>(this.urlService.get('userDetail', { email }))
        .pipe(tap(res => this.updateStorage(res, email, index, refresh)));
    }
    this.selectedUser$.next(this.users[index]);
    this.setSelectedSideBarItem(null);
    return of(this.users[index]);
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
    this.users.unshift(obj);
    this.userList$.next(this.users);
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  setSelectedSideBarItem(profileId: string): void {
    this.selectedSideBarItem = profileId;
  }

  getSelectedSideBarItem(): string {
    return this.selectedSideBarItem;
  }

}
