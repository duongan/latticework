import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

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

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      localStorage.getItem('userToken')
    );
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
      if (error.status === 500) {
        this.errors.login = 'Incorrect account or password';
      }
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  login(account: string, password: string): Observable<any> {
    const token = 'eyJ0eXAiOiJKV';
    localStorage.setItem('userToken', token);
    this.currentUserSubject.next(token);
    return of(token);
    /* return this.http
      .post<any>(
        'http://10.49.8.222:8888/auth/login',
        { account, password },
        httpOptions
      )
      .pipe(
        map(result => {
          this.errors.login = '';
          const { token } = result.data;
          localStorage.setItem('userToken', token);
          this.currentUserSubject.next(token);
          return result;
        }),
        catchError(this.handleError('login'))
      ); */
  }

  logout() {
    localStorage.clear();
    this.currentUserSubject.next(null);
  }
}
