import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';
import { UrlService } from '../services/url.service';

@Injectable()

export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService, private urlService: UrlService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(this.auth.currentUserValue);
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(this.urlService.host);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        
        return next.handle(request);
    }
}
