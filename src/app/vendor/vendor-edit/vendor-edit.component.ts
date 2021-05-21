import {Component, Injector, Input, OnInit} from '@angular/core';
import {VendorBaseComponent} from '../vendor-base/vendor-base.component';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: '../vendor-base/vendor-base.component.html',
  styleUrls: ['./vendor-edit.component.scss']
})
export class VendorEditComponent extends VendorBaseComponent {
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
