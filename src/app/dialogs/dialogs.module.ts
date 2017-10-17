import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AddMissionTypeComponent } from './add-soldier/add-missionType.component';
import { DialogComponent } from './add-soldier/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        AddMissionTypeComponent,
        DialogComponent
    ],
    exports: [
        AddMissionTypeComponent,
    ], 
    entryComponents: [DialogComponent,],  
    
})
export class DialogsModule { }
