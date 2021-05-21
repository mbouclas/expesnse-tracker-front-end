import {APP_INITIALIZER, DEFAULT_CURRENCY_CODE, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './auth/jwt.interceptor';
import {ErrorInterceptor} from './auth/error.interceptor';
import {LayoutModule} from './layout/layout.module';
import {appInitializer} from './auth/app.initializer';
import {AuthService} from './auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {CustomIconService} from './helpers/custom-icon.service';
import {setAppInjector} from './helpers/setAppInjector';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {BootService} from './shared/services/boot.service';
import {AppStateActions} from './state/app.state';
import {AppService} from './shared/services/app.service';
import {HomeModule} from './home/home.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HomeModule,
        HttpClientModule,
        LayoutModule,
        BrowserAnimationsModule,
        SharedModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the app is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
    exports: [

    ],
    providers: [
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService, BootService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        injector: Injector,
        icons: CustomIconService,
        bootService: BootService,
    ) {
        setAppInjector(injector);
        // Triggers after login or JWT refresh on the appInitializer
        AuthService.onLogin.subscribe(async r => {
            if (!r) {return;}
            const bootResult = await bootService.boot()
            AppStateActions.setBoot(bootResult);
        });

        AppService.refreshBoot.subscribe(async boot => {
            const bootResult = await bootService.boot()
            AppStateActions.setBoot(bootResult);
        });

        icons.register('pdf', './assets/icons/pdf.svg');
        icons.register('word', './assets/icons/word.svg');
        icons.register('file', './assets/icons/file-generic.svg');
    }
}
