import {Component, OnInit, ViewChild} from '@angular/core';
import {Select} from './decorators/select.decorator';
import {AppStateActions, IAuthUser} from './state/app.state';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {AuthService} from './auth/auth.service';
import {filter, map, mergeMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Plugins } from '@capacitor/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {SwUpdate} from '@angular/service-worker';
import {AppService} from './shared/services/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @Select('user') user$: Observable<IAuthUser>;
    @ViewChild('drawer') drawer: any;
    title = `Expense Tracker`;

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
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private swUpdate: SwUpdate,
        private appService: AppService,
    ) {
        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
        }

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                // trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
                // if you need to scroll back to top, here is the right place
                window.scrollTo(0, 0);
            }
        });
    }

    async ngOnInit() {
        this.swUpdate.available.subscribe(event => {
            this.appService.showSnackBar('New Update found. Reloading app', 'info');
            setTimeout(() => location.reload(true), 2000);

        });

        this.isHandset$.subscribe(res => {
            AppStateActions.setIsHandset(res);
            this.isHandset = res;
        })

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map(route => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter(route => route.outlet === 'primary'),
                mergeMap(route => route.data)
            )
            .subscribe(event => {
                const part = (event.title) ? `| ${event['title']}` : '';
                this.titleService.setTitle(`${this.title} ${part}` || this.title);
            });

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
