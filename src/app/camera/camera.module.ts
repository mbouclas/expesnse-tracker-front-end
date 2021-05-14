import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera/camera.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';



@NgModule({
    declarations: [
        CameraComponent
    ],
    exports: [
        CameraComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
    ]
})
export class CameraModule { }
