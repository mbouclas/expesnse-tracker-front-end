import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IVendor} from '../../models/vendor.model';
import {Select} from '../../decorators/select.decorator';
import {AppSettings} from '../../app.settings';
import {MatDialog} from '@angular/material/dialog';
import {VendorService} from '../vendor.service';
import {AppService} from '../../shared/services/app.service';
import {VendorDialogComponent} from '../dialogs/vendor-dialog/vendor-dialog.component';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit, OnDestroy {
  @Select('vendors') vendors$: Observable<IVendor[]>;
  @Select('isHandset') isHandset$: Observable<boolean>;
  private _subscriptions :any[] = [];
  public isHandset = false;
  private dialogWidth = AppSettings.dialogs.defaultWidth;
  private dialogHeight = AppSettings.dialogs.defaultHeight;

  constructor(
      private dialog: MatDialog,
      private service: VendorService,
  ) { }

  ngOnInit() {
    this._subscriptions.push(this.isHandset$.subscribe(isIt => {
      this.dialogWidth = (isIt) ? AppSettings.dialogs.handsetWidth : AppSettings.dialogs.defaultWidth;
      this.dialogHeight = (isIt) ? AppSettings.dialogs.defaultHeight : AppSettings.dialogs.defaultHeight;
      this.isHandset = isIt;

    }));
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  async delete(id: number) {
    const c = confirm('Are you sure?')
    if (!c) {return;}

    await this.service.delete(id);
    AppService.refreshBoot.emit(true);
  }

  edit(id: number) {
    this.dialog.open(VendorDialogComponent, {
      width: this.dialogWidth,
      height: this.dialogHeight,
      data: {
        id,
        closeOnSave: true,
      }
    }).componentInstance.onSaved.subscribe(item => AppService.refreshBoot.emit(true));
  }

  add() {
    const d = this.dialog.open(VendorDialogComponent, {
      width: this.dialogWidth,
      height: this.dialogHeight,
      data: {
        closeOnSave: true,
      }
    }).componentInstance.onSaved.subscribe(item => AppService.refreshBoot.emit(true));
  }

}
