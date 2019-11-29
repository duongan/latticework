import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private host = 'http://10.49.8.222:8888';
  private urls = {
    login: `${this.host}/auth/login`,
    userSearch: `${this.host}/user/search/{identity}`,
    userDetail: `${this.host}/user/details/{email}`,
    amberProfile: `${this.host}/amber/profile/{profileId}`,
    amberDeviceInfo: `${this.host}/amber/device_info/{assignId}`,
    activityInfo: `${this.host}/amber/activity_event_list/{profileId}`,
    appProfile: `${this.host}/clientapp/profile/{profileId}`,
    appActivityInfo: `${this.host}/clientapp/activity_event_list/{profileId}`,
    amberLogList: `${this.host}/amber/log_authorization_list/{profileId}`,
    appLogList: `${this.host}/clientapp/log_authorization_list/{profileId}`
  };

  constructor() {}

  get(key: string, params?: object | null): string {
    let url: string = this.urls[key] || key;
    if (params) {
      Object.keys(params).forEach(paramName => {
        url = url.replace(`{${paramName}}`, params[paramName]);
      });
    }
    return url;
  }
}
