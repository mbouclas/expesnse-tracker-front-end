import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpenseRoutingModule} from './expense-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ExpenseTableComponent} from './expense-table/expense-table.component';
import { ExpenseListComponent } from './expense-list/expense-list.component';
import { ExpenseAddComponent } from './expense-add/expense-add.component';
import { ExpenseEditComponent } from './expense-edit/expense-edit.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {CameraModule} from '../camera/camera.module';
import { ExpenseBaseComponent } from './expense-base/expense-base.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {UploaderModule} from '../uploader/uploader.module';


@NgModule({
    declarations: [
        ExpenseTableComponent,
        ExpenseListComponent,
        ExpenseAddComponent,
        ExpenseEditComponent,
        ExpenseBaseComponent,
    ],
    imports: [
        CommonModule,
        ExpenseRoutingModule,
        SharedModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatGridListModule,
        UploaderModule,
        CameraModule,
    ],
    exports: [
        ExpenseTableComponent,
    ]
})
export class ExpenseModule {
}
