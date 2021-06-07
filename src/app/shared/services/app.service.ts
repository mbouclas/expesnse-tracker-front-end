import {EventEmitter, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ComponentType} from '@angular/cdk/overlay';
import {LoadingDialogComponent} from '../components/dialogs/loading-dialog/loading-dialog.component';
import {IGenericObject} from '../../models/generic';

export interface ISnackBarMessage {
    message: string;
    type?: 'success'|'error';
}


@Injectable({providedIn: 'root'})
export class AppService {
    public static refreshBoot = new EventEmitter<boolean>();
    public static stateRefreshed = new EventEmitter<boolean>();
    public snackBarEmitter = new EventEmitter<ISnackBarMessage>();
    public static defaultDialogWidth = '80vw';
    constructor(
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
    ) {
    }

    public showSnackBar(message: string, type: 'success'|'error'|'info'|'warn' = 'success') {
        this.snackBar.open(message, '×', {panelClass: `mat-${type}`, verticalPosition: 'bottom', duration: 3000});
    }

    public showLoadingDialog() {
        return this.dialog.open(LoadingDialogComponent);
    }

    public openDialog(component: ComponentType<any>, data: IGenericObject = {}) {
        return this.dialog.open(component, {
            width: AppService.defaultDialogWidth,
            data
        });
    }
}
