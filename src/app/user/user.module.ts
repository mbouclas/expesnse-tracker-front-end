import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule,
    ]
})
export class UserModule {
}
