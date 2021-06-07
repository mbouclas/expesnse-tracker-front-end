import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExpenseTypeRoutingModule} from './expense-type-routing.module';
import {ExpenseTypeListComponent} from './expense-type-list/expense-type-list.component';
import {SharedModule} from '../shared/shared.module';
import { ExpenseTypeDialogComponent } from './dialogs/expense-type-dialog/expense-type-dialog.component';
import { ExpenseTypeAddComponent } from './expense-type-add/expense-type-add.component';
import { ExpenseTypeUpdateComponent } from './expense-type-update/expense-type-update.component';
import { ExpenseTypeBaseComponent } from './expense-type-base/expense-type-base.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    declarations: [
        ExpenseTypeListComponent,
        ExpenseTypeDialogComponent,
        ExpenseTypeAddComponent,
        ExpenseTypeUpdateComponent,
        ExpenseTypeBaseComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        ExpenseTypeRoutingModule
    ]
})
export class ExpenseTypeModule {
}
