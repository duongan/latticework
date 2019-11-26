import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from './http.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpService, private urlService: UrlService) {}

  searchUser(identity: string): Observable<any> {
    if (!identity.trim()) {
      return of({});
    }
    return this.http
      .get<any>(this.urlService.get('userSearch', { identity }))
      .pipe(map(res => res.data));
  }

  getUserDetail(email: string): Observable<any> {
    return this.http.get<any>(this.urlService.get('userDetail', { email }));
  }
}
