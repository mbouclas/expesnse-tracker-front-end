import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VendorListComponent} from './vendor-list/vendor-list.component';

const routes: Routes = [
  {path: '', component: VendorListComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
