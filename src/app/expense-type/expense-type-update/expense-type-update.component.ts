import {Component, Injector, Input, OnInit, Output} from '@angular/core';
import {ExpenseTypeBaseComponent} from '../expense-type-base/expense-type-base.component';

@Component({
  selector: 'app-expense-type-update',
  templateUrl: '../expense-type-base/expense-type-base.component.html',
  styleUrls: ['./expense-type-update.component.scss']
})
export class ExpenseTypeUpdateComponent extends ExpenseTypeBaseComponent {
  @Input() id: number;

  constructor(injector: Injector) {
    super(injector);
  }

  async ngOnInit() {
    super.ngOnInit();

    if (this.id) {
      await this.init();
      return;
    }

    this.route.params.subscribe(async params => {
      this.id = parseInt(params.id);
      await this.init();
    });

    this.item = await this.service.findOne(this.id);
  }

  async init() {
    // let get the data
    this.item = await this.service.findOne(this.id);
    this.setUpFormValues();
    this.isReady = true;
  }



  async save() {
    await super.save();
    const d = this.appService.showLoadingDialog();
    await this.service.update(this.item);
    d.close();
    this.appService.showSnackBar('Saved');
    this.onSave.emit(this.item);

  }
}
