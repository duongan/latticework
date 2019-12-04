import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { UrlService } from './url.service';
import { Subject, of, Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Amber } from '../types/amber';

@Injectable({
  providedIn: 'root'
})
export class AmberService {
  private amberInfo$ = new Subject<Amber>();

  constructor(private http: HttpService, private urlService: UrlService) {}

  get amberInfo(): Observable<any> {
    return this.amberInfo$.asObservable();
  }

  getProfileInfo(profileId: string): Observable<any> {
    if (!profileId) {
      return of(null);
    }

    return this.http
      .get(this.urlService.get('amberProfile', { profileId }))
      .pipe(map((res: any) => res.data));
  }

  getDeviceInfo(assignId: string): Observable<any> {
    if (!assignId) {
      return of(null);
    }

    return this.http
      .get(this.urlService.get('amberDeviceInfo', { assignId }))
      .pipe(map((res: any) => res.data));
  }

  getActivityEventList(profileId: string): Observable<any> {
    if (!profileId) {
      return of(null);
    }

    return this.http
      .get(this.urlService.get('activityInfo', { profileId }))
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

  getAmberInfo(profileId: string, assignId: string): void {
    if (!profileId || !assignId) {
      return;
    }
    zip(
      this.getProfileInfo(profileId),
      this.getDeviceInfo(assignId),
      this.getActivityEventList(profileId)
    ).subscribe(([profileInfo, deviceInfo, activityEventList]) => {
      this.amberInfo$.next({
        profileInfo,
        deviceInfo,
        activityEventList
      });
    });
  }
}
