import {Component, Injector} from '@angular/core';
import {ExpenseBaseComponent} from '../expense-base/expense-base.component';
import {getFormValidationErrors} from '../../helpers/getFormValidationErrors';



@Component({
    selector: 'app-expense-add',
    templateUrl: '../expense-base/expense-base.component.html',
    styleUrls: ['./expense-add.component.scss']
})
export class ExpenseAddComponent extends ExpenseBaseComponent {
    debugMode = false;
    constructor(injector: Injector) {
        super(injector);
    }

    async ngOnInit() {
        await super.ngOnInit();
        this.isReady = true;
    }

    async save() {
        if (this.form.invalid) {
            getFormValidationErrors(this.form)
            return;
        }

        Object.keys(this.form.controls).forEach(key => {
            const control = this.form.get(key);
            this.item[key] = control.value;
        });


        const d = this.appService.showLoadingDialog();
        const res = await this.service.store(this.item);
        this.appService.showSnackBar('Saved...');
        this.onSave.emit(res);

        d.close();

        if (!this.isDialog) {
            await this.router.navigate(['/expense', res.id, 'edit']);
        }
    }



}
