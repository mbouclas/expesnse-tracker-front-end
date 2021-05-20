import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select} from '../../decorators/select.decorator';
import {Observable} from 'rxjs';
import {IExpenseType} from '../../models/expense-type.model';
import {MatDialog} from '@angular/material/dialog';
import {ExpenseTypeDialogComponent} from '../dialogs/expense-type-dialog/expense-type-dialog.component';
import {AppSettings} from '../../app.settings';
import {AppService} from '../../shared/services/app.service';
import {ExpenseTypeService} from '../expense-type.service';

@Component({
  selector: 'app-expense-type-list',
  templateUrl: './expense-type-list.component.html',
  styleUrls: ['./expense-type-list.component.scss']
})
export class ExpenseTypeListComponent implements OnInit, OnDestroy {
  @Select('expenseTypes') expenseTypes$: Observable<IExpenseType[]>;
  @Select('isHandset') isHandset$: Observable<boolean>;
  private _subscriptions :any[] = [];
  public isHandset = false;
  private dialogWidth = AppSettings.dialogs.defaultWidth;
  private dialogHeight = AppSettings.dialogs.defaultHeight;

  constructor(
      private dialog: MatDialog,
      private service: ExpenseTypeService,
  ) { }

  ngOnInit(): void {
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
    await this.service.delete(id);
    AppService.refreshBoot.emit(true);
  }

  edit(id: number) {
    this.dialog.open(ExpenseTypeDialogComponent, {
      width: this.dialogWidth,
      height: this.dialogHeight,
      data: {
        id,
        closeOnSave: true,
      }
    }).componentInstance.onSaved.subscribe(item => AppService.refreshBoot.emit(true));
  }

  add() {
    const d = this.dialog.open(ExpenseTypeDialogComponent, {
      width: this.dialogWidth,
      height: this.dialogHeight,
      data: {
        closeOnSave: true,
      }
    }).componentInstance.onSaved.subscribe(item => AppService.refreshBoot.emit(true));
  }
}
