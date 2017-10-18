import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { AddMissionTypeComponent } from './add-missionType/add-missionType.component';
import { DialogComponent } from './add-missionType/dialog/dialog.component';
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
    providers: []
    
})
export class DialogsModule { }
