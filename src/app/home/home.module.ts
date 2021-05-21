import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        HomeComponent,
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        NgxChartsModule,
        BrowserAnimationsModule,
        SharedModule,
        MatGridListModule,
        MatCardModule,


    ],
    exports: [
        DashboardComponent,
    ]
})
export class HomeModule {
}
