import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VendorRoutingModule} from './vendor-routing.module';
import {VendorListComponent} from './vendor-list/vendor-list.component';
import {VendorDialogComponent} from './dialogs/vendor-dialog/vendor-dialog.component';
import {VendorBaseComponent} from './vendor-base/vendor-base.component';
import {VendorEditComponent} from './vendor-edit/vendor-edit.component';
import {VendorAddComponent} from './vendor-add/vendor-add.component';
import {SharedModule} from '../shared/shared.module';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
    declarations: [
        VendorListComponent,
        VendorDialogComponent,
        VendorBaseComponent,
        VendorEditComponent,
        VendorAddComponent
    ],
    imports: [
        CommonModule,
        VendorRoutingModule,
        SharedModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
    ]
})
export class VendorModule {
}
