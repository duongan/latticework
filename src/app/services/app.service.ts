import { Injectable } from '@angular/core';
import { Subject, Observable, of, zip } from 'rxjs';
import { App } from '../types/app';
import { HttpService } from './http.service';
import { UrlService } from './url.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private appInfo$ = new Subject<App>();

  constructor(private http: HttpService, private urlService: UrlService) {}

  get appInfo(): Observable<App> {
    return this.appInfo$.asObservable();
  }

  getProfileInfo(profileId: string): Observable<any> {
    if (!profileId) {
      return of(null);
    }

    return this.http
      .get(this.urlService.get('appProfile', { profileId }))
      .pipe(map((res: any) => res.data));
  }

  getActivityEventList(profileId: string): Observable<any> {
    if (!profileId) {
      return of(null);
    }

    return this.http
      .get(this.urlService.get('appActivityInfo', { profileId }))
      .pipe(map((res: any) => {
        if (res && res.data) {
          return res.data;
        }
        return [];
      }));
  }

  getLogList(profileId: string): Observable<any> {
    if (!profileId) {
      return of(null);
    }
    return this.http
      .get(this.urlService.get('amberLogList', { profileId }))
      .pipe(map((res: any) => {
        if (res) {
          return res.data;
        }
        return [];
      }));
  }

  getAppInfo(profileId: string): void {
    if (!profileId) {
      return;
    }

    zip(
      this.getProfileInfo(profileId),
      this.getActivityEventList(profileId),
      this.getLogList(profileId)
    ).subscribe(([profileInfo, activityEventList, logList]) => {
      this.appInfo$.next({
        profileInfo,
        activityEventList,
        logList
      });
    });
  }
}
