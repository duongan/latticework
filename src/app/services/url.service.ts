import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  private host = 'http://10.49.8.222:8888';
  private urls = {
    login: `${this.host}/auth/login`,
    userSearch: `${this.host}/user/search/{identity}`,
    userDetail: `${this.host}/user/details/{email}`
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
