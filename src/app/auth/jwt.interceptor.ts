import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser = this.authenticationService.getUser();
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = request.url.startsWith(environment.API_ENDPOINT) || request.url.indexOf('revoke-token');

        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                withCredentials: true,
                setHeaders: {
                    'X-JWT-Token': `${currentUser.token}`
                }
            });
        }

        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse && event.headers.has('x-jwt-token')) {
                        this.authenticationService.refreshUserToken(request.headers.get('x-jwt-token'));
                        console.log('Token refreshed with ', request.headers.get('x-jwt-token'))
                    }
                })
            )
    }
}
