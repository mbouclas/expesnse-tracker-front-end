import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpenseListComponent} from './expense-list/expense-list.component';
import {ExpenseEditComponent} from './expense-edit/expense-edit.component';
import {ExpenseAddComponent} from './expense-add/expense-add.component';

const routes: Routes = [
  {path: '', component: ExpenseListComponent, data: {title: 'List Expenses'}, runGuardsAndResolvers: 'pathParamsOrQueryParamsChange'},
  {path: ':id/edit', component: ExpenseEditComponent, data: {title: 'Edit Expense', runGuardsAndResolvers: 'pathParamsChange'}},
  {path: 'new', component: ExpenseAddComponent, data: {title: 'Add Expense'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
