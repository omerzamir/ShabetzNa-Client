import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { MdDatepicker, MdCalendar } from '@angular/material';
import { CovalentStepsModule } from '@covalent/core';
import { AddMissionTypeComponent } from './add-missionType/add-missionType.component';
import { AddMissionComponent } from './add-mission/add-mission.component';
import { DialogComponent as dialogMissiontype} from './add-missionType/dialog/dialog.component';
import { DialogComponent as dialogMission } from './add-mission/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CovalentStepsModule,
    ],
    declarations: [
        AddMissionTypeComponent,
        AddMissionComponent,
        dialogMissiontype,
        dialogMission,
    ],
    exports: [
        AddMissionTypeComponent,
        AddMissionComponent
    ], 
    entryComponents: [dialogMissiontype,dialogMission],    
})
export class DialogsModule { }
