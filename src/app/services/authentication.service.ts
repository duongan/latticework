import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { UrlService } from './url.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private errors = {
    login: ''
  };

  constructor(private http: HttpClient, private urlService: UrlService) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  public get authErrors() {
    return this.errors;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // console.log(`${operation} failed: ${error.message}`);
      console.log(error);
      if (error.status !== 200) {
        this.errors.login = 'Incorrect account or password';
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  login(account: string, password: string): Observable<any> {
    const uri = this.urlService.get('login');
    return this.http.post<any>(uri, { account, password }, httpOptions)
      .pipe(
        map(result => {
          this.errors.login = '';
          const { token } = result.data;
          const currentUser = JSON.stringify({ account, token });
          localStorage.setItem('currentUser', currentUser);
          this.currentUserSubject.next(currentUser);
          return currentUser;
        }),
        catchError(this.handleError('login'))
      );
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}
