import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [
        HomeComponent,
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,


    ]
})
export class HomeModule {
}
