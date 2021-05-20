import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpenseTypeListComponent} from './expense-type-list/expense-type-list.component';

const routes: Routes = [
  {path: '', component: ExpenseTypeListComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseTypeRoutingModule { }
