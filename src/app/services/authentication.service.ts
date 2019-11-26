import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('userToken'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(account: string, password: string): Observable<any> {
    return this.http.post<any>('http://10.49.8.222:8888/auth/login', { account, password }, httpOptions)
      .pipe(map(result => {
        const { token } = result.data;
        localStorage.setItem('userToken', token);
        this.currentUserSubject.next(token);
        return result;
      }));
  }

  logout() {
    localStorage.removeItem('userToken');
    this.currentUserSubject.next(null);
  }

}
