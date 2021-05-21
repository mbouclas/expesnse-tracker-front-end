import {Component, Injector} from '@angular/core';
import {ExpenseBaseComponent} from '../expense-base/expense-base.component';
import findIndex from 'lodash.findindex';
import {AttachmentModel, IAttachment} from '../../models/attachment.model';
import {LoadingDialogComponent} from '../../shared/components/dialogs/loading-dialog/loading-dialog.component';
import {ExportService} from '../export.service';


@Component({
  selector: 'app-expense-edit',
  templateUrl: '../expense-base/expense-base.component.html',
  styleUrls: ['./expense-edit.component.scss']
})
export class ExpenseEditComponent extends ExpenseBaseComponent {
  debugMode = false;

  constructor(
      injector: Injector,
      private exportService: ExportService,
  ) {
    super(injector);

  }

  async ngOnInit() {
    await super.ngOnInit();
    if (this.id) {
      await this.init();
      return;
    }

    this.route.params.subscribe(async params => {
      this.id = params.id;
      await this.init();
    });



  }

  async init() {
    // let get the data
    this.item = await this.service.findOne(parseInt(this.id), {with: ['expenseTypes', 'attachments', 'vendor']});
    this.setUpFormValues();
    this.isReady = true;
  }

  async save() {
    const d = this.dialog.open(LoadingDialogComponent);
    await this.service.update(this.item);
    d.close();
    this.appService.showSnackBar('Saved');
  }

  setupAttachments() {
    if (this.item.attachments.length === 0) {return;}
    this.item.attachments = this.item.attachments.map(a => {
      return this.convertAttachmentToUiFormat(a);
    })

  }

  setUpFormValues() {
    Object.keys(this.form.controls)
        .forEach(key => {
          this.form.controls[key].setValue(this.item[key]);
        });

    if (this.item.expenseTypes.length > 0) {
      const tmpTypes = Object.assign([], this.item.expenseTypes);

      this.item.expenseTypes = tmpTypes.map((item, index) => {
        // find the index of the type
        const idx = findIndex(this.expenseTypes, {id: item.id});
        return this.expenseTypes[idx];
      });
      this.form.controls.expenseTypes.setValue(this.item.expenseTypes);
    }
  }

  private convertAttachmentToUiFormat(a: IAttachment) {
    const attachment = new AttachmentModel();

    return attachment;
  }

  async downloadAsZip() {
    await this.exportService.export(this.item.id);
  }

  async emailAsZip() {

  }
}
