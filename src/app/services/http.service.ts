import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(catchError(this.handleError<T>(url)));
  }

  post<T>(url: string, postData: any): Observable<T> {
    return this.http
      .post<T>(url, postData, this.httpOptions)
      .pipe(catchError(this.handleError<T>(url)));
  }

  private handleError<T>(url: string) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error(
          `An error occurred with url: ${url}:`,
          error.error.message
        );
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status} with url: ${url}`,
          error
        );
      }
      return of(null);
    };
  }
}
