import {Injector, NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth/auth.guard';
import {HomeComponent} from './home/home/home.component';

const routes: Routes = [
    {
        path: '', canActivate: [AuthGuard], children: [
            {path: '', component: HomeComponent, data: {title: 'Home'}},
            {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
            {path: 'expense', loadChildren: () => import('./expense/expense.module').then(m => m.ExpenseModule)},
            {path: 'expense-type', loadChildren: () => import('./expense-type/expense-type.module').then(m => m.ExpenseTypeModule)},
            {path: 'attachment', loadChildren: () => import('./attachment/attachment.module').then(m => m.AttachmentModule)},
            {path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule)},
        ]
    },
    {path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
