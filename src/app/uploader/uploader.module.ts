import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AttachFileComponent} from './attach-file/attach-file.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {SharedModule} from '../shared/shared.module';



@NgModule({
    declarations: [
        AttachFileComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatCardModule,
    ],
    exports: [
        AttachFileComponent
    ]
})
export class UploaderModule {
}
