import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SmallToolbarComponent } from './components/small-toolbar/small-toolbar.component';
import {BigButtonComponent} from './components/big-button/big-button.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {LoadingDialogComponent} from './components/dialogs/loading-dialog/loading-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FormatToDatePipe} from '../helpers/format-to-date.pipe';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BytesPipe} from '../helpers/bytes.pipe';
import { CustomDatePickerHeaderComponent } from './components/custom-date-picker-header/custom-date-picker-header.component';
import {MatSelectModule} from '@angular/material/select';


const matModules = [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSelectModule,
];

const exportedDeclarations = [
    SmallToolbarComponent,
    BigButtonComponent,
    LoadingDialogComponent,
    FormatToDatePipe,
    BytesPipe,
];

@NgModule({
    declarations: [
        ...exportedDeclarations,
        CustomDatePickerHeaderComponent,
  ],
    imports: [
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ...matModules,
    ],
    exports: [
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        ...matModules,
        ...exportedDeclarations,
    ]
})
export class SharedModule {
}
