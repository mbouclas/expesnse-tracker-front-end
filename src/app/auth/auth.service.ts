import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthStateActions, IAuthUser, store} from '../state/app.state';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {IRequestResponse} from '../models/generic';
import {debug} from '../helpers/debug';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private refreshTokenTimeout;
    public static onLogin = new EventEmitter<boolean>();

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
    }

    static getAuthTokenFromLocalStorage() {
        try {
            return JSON.parse(localStorage.getItem('token'));
        } catch (e) {
            return null;
        }
    }

    getTokenFromStorage(): IAuthUser {
        return AuthService.getAuthTokenFromLocalStorage();
    }

    refreshUserToken(token: string) {
        const user = this.getUser();
        user.token = token;
        this.setUser(user);

        return this;
    }

    setTokenToStorage(token: IAuthUser) {
        try {
            localStorage.setItem('token', JSON.stringify(token));
            return this;
        } catch (e) {
            return this;
        }
    }

    setUser(user: IAuthUser) {
        AuthStateActions.setUser(user);
        this.setTokenToStorage(user);

        return this;
    }

    async login(email: string, password: string) {
        let res;
        try {
            res = await this.http.post<IAuthUser|IRequestResponse>(`${environment.BASE_URL}/oauth/token`, {email, password}).toPromise();
        } catch (e) {
            console.log('Login Error', e);
        }

        if (!res.token && res.reason) {
            return res;
        }


        this.setUser(res);
        this.startRefreshTokenTimer();
        // Emit event
        AuthService.onLogin.emit(true);
        return res;
    }

    async logout() {
        // Hit the revoke token url
        try {
            await this.http.post<IRequestResponse>(`${environment.BASE_URL}/oauth/revoke-token`, {token: store.getState().user.token}, {withCredentials: true}).toPromise();
        }
        catch (e) {
            console.log('Error revoking token', e);
        }

        AuthStateActions.logout();
        localStorage.removeItem('token');
        this.stopRefreshTokenTimer();
        return await this.router.navigate(['/login']);
    }

    static currentUser() {
        // try to get a user from the state
        let user = store.getState().user;
        if (user && user.token) {
            return user;
        }

        // try to get the user from localStorage
        user = AuthService.getAuthTokenFromLocalStorage();
        if (!user || !user.token) {
            return null;
        }

        // set the state
        AuthStateActions.setUser(user);

        return user;
    }

    getUser() {
        return AuthService.currentUser();
    }

    async refreshToken(token: string) {
        debug('Refreshing the token');
        let res;
        try {
            res = await this.http.post<IAuthUser>(`${environment.BASE_URL}/oauth/refresh-token`, {token}, {withCredentials: true}).toPromise();
        } catch (e) {
            console.log(e);
        }

        if (!res) {
            await this.logout();
        }

        this.setUser(res);
        this.startRefreshTokenTimer();

    }

    private startRefreshTokenTimer() {
        // refresh the token 1 minute before it expires. We have the expiry from the login into the store
        const expires = new Date(store.getState().user.expires);
        const timeout = (expires.getTime() - Date.now()) - (60 * 1000);

        this.refreshTokenTimeout = setTimeout(async () => {
            console.log('Refresh triggered', expires.getTime() - Date.now() - (60 * 1000));
            await this.refreshToken(store.getState().user.refreshToken);
        }, timeout);
    }

    private stopRefreshTokenTimer() {
        clearTimeout(this.refreshTokenTimeout);
    }

    async sendResetPasswordVerificationCode(value: string) {

    }
}
