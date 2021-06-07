import {Component, Injector, OnInit} from '@angular/core';
import {ExpenseTypeBaseComponent} from '../expense-type-base/expense-type-base.component';
import {AppService} from '../../shared/services/app.service';

@Component({
  selector: 'app-expense-type-add',
  templateUrl: '../expense-type-base/expense-type-base.component.html',
  styleUrls: ['./expense-type-add.component.scss']
})
export class ExpenseTypeAddComponent extends ExpenseTypeBaseComponent {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    super.ngOnInit();
    this.setUpFormValues();
  }

  async save() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      this.item[key] = control.value;
    });

    const d = this.appService.showLoadingDialog();
    const res = await this.service.store(this.item);
    this.appService.showSnackBar('Saved...');
    this.onSave.emit(res);
    AppService.refreshBoot.emit(true);
    d.close();
  }
}
