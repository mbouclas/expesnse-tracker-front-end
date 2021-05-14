import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultComponent} from './default/default.component';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        DefaultComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ]
})
export class LayoutModule {
}
