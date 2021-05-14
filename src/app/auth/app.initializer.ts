import {AuthService} from './auth.service';


export function appInitializer(authenticationService: AuthService) {
    return () => new Promise(async resolve => {
        const user = authenticationService.getUser();
        if (!user || !user.token) {return resolve(true);}
        // attempt to refresh token on app start up to auto authenticate
        await authenticationService.refreshToken(user.refreshToken);
        AuthService.onLogin.emit(true);
        resolve(true);
    });
}
