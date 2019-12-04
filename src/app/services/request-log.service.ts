import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from '../services/url.service';
import { DEVICE_TYPE } from '../constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RequestLogService {

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) { }

  requestLog(type: any, params: any) {
    let url: string;
    if (DEVICE_TYPE[type] === DEVICE_TYPE[1]) {
      url = this.urlService.get('requestAmberLog');
    } else if (DEVICE_TYPE[type] === DEVICE_TYPE[2]) {
      url = this.urlService.get('requestAppLog');
    }
    return this.http.post(url, params, httpOptions);
  }

}
