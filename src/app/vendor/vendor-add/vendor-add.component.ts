import {Component, Injector, OnInit} from '@angular/core';
import {VendorBaseComponent} from '../vendor-base/vendor-base.component';
import {AppService} from '../../shared/services/app.service';

@Component({
  selector: 'app-vendor-add',
  templateUrl: '../vendor-base/vendor-base.component.html',
  styleUrls: ['./vendor-add.component.scss']
})
export class VendorAddComponent extends VendorBaseComponent {

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
