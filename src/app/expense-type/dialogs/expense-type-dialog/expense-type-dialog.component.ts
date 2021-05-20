import {Component, OnInit, Output, EventEmitter, Inject} from '@angular/core';
import {ExpenseTypeModel} from '../../../models/expense-type.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
export interface IExpenseTypeDialogData {
  id?: number;
  closeOnSave: boolean;
}
@Component({
  selector: 'app-expense-type-dialog',
  templateUrl: './expense-type-dialog.component.html',
  styleUrls: ['./expense-type-dialog.component.scss']
})
export class ExpenseTypeDialogComponent implements OnInit {
  @Output() onSaved = new EventEmitter<ExpenseTypeModel>();

  constructor(
      @Inject(MAT_DIALOG_DATA) public data: IExpenseTypeDialogData,
      public dialogRef: MatDialogRef<ExpenseTypeDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onSave($event: ExpenseTypeModel) {
    this.onSaved.emit($event);

    if (this.data && this.data.closeOnSave) {
      this.dialogRef.close();
    }
  }
}
