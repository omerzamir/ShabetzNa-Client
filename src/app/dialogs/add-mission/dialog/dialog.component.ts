import { Component, ChangeDetectorRef } from '@angular/core';
import { MdDialogRef, MdRadioModule } from '@angular/material';
import { NgForm } from '@angular/forms';
import { MissionService, MissionTypesService } from '../../../_services/index';
import { StepState } from '@covalent/core';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [MissionService, MissionTypesService]
})
export class DialogComponent {
  type: Number = 3;
  options;
  selectedMission: String;
  startDateStr: string;
  startDate: Date;
  constructor(public dialogRef: MdDialogRef<DialogComponent>,
    private misisonService: MissionService, private cdRef: ChangeDetectorRef, private missionTypesService: MissionTypesService) {

    this.missionTypesService.getMissionTypes().subscribe((data) => {
      this.options = data;
    });

  }
  stateStep1: StepState = StepState.None;
  stateStep2: StepState = StepState.None;
  stateStep3: StepState = StepState.None;
  private activeStep: number = 0;
  disabled: boolean = false;
  date: String;

  cancel(): void {
    this.dialogRef.close();
  }

  onSubmit(f: NgForm): void {
    // this.misisonService.addMIssionType(f.value);
    // this.sidebarService.refresh(f.value);
    console.log(f.value);
    this.dialogRef.close();
  }

  activeStep1Event(): void {
    this.activeStep = 1;
    this.startDate = new Date(this.startDateStr);
  }

  activeStep2Event(): void {
    this.activeStep = 2;
  }

  activeStep0Event(): void {
    this.activeStep = 0;
  }

  deactiveStep0Event(): void {
    if(this.selectedMission) {
      this.stateStep1 = StepState.Complete;
    } else { 
      this.stateStep1 = StepState.Required;
    }
  }
  deactiveStep1Event(): void {
    // debugger;
  }
  deactiveStep2Event(): void {
    // debugger;
  }
  nextStep() {
    this.activeStep++;
    this.cdRef.detectChanges();
  }
}
