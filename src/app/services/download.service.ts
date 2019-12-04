import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../services/url.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  fileUrl: string;

  constructor(
    private http: HttpClient,
    private urlService: UrlService
  ) { }

  downloadLog(authorization_id: string) {
    const url = this.urlService.get('downloadLog', { authorization_id });
    return this.http.get(url, { responseType: 'blob' });
  }
}
