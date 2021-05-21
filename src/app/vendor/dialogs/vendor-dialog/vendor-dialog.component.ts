import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {VendorModel} from '../../../models/vendor.model';

interface IVendorDialogData {
  id?: number;
  closeOnSave: boolean;
}

@Component({
  selector: 'app-vendor-dialog',
  templateUrl: './vendor-dialog.component.html',
  styleUrls: ['./vendor-dialog.component.scss']
})
export class VendorDialogComponent implements OnInit {
  @Output() onSaved = new EventEmitter<VendorModel>();
  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IVendorDialogData,
      public dialogRef: MatDialogRef<VendorDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onSave($event: VendorModel) {
    this.onSaved.emit($event);

    if (this.data && this.data.closeOnSave) {
      this.dialogRef.close();
    }
  }

}
