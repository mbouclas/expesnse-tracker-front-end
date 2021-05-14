import {Component, OnInit, ViewChild} from '@angular/core';
import {Select} from './decorators/select.decorator';
import {AppStateActions, IAuthUser} from './state/app.state';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {AuthService} from './auth/auth.service';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Plugins } from '@capacitor/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @Select('user') user$: Observable<IAuthUser>;
    @ViewChild('drawer') drawer: any;

    public isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(
            map((result: BreakpointState) => result.matches)
        );
    public isHandset = false;
    public sideNavState = false;


    constructor(
        private authService: AuthService,
        private breakpointObserver: BreakpointObserver,
    ) {

    }

    async ngOnInit() {
        this.isHandset$.subscribe(res => {
            AppStateActions.setIsHandset(res);
            this.isHandset = res;
        })
        // this.user$.subscribe(res => console.log(res));
    }

    // https://stackblitz.com/edit/angular-closing-side-nav-in-mobile?file=app%2Fsidenav-responsive-example.html

    closeSideNav() {
        if (this.drawer._mode=='over') {
            this.drawer.close();
        }
    }

    async login() {
        await this.authService.login('mbouclas@gmail.com', 'magicj');
    }

    async logout() {
        await this.authService.logout();
    }

}
