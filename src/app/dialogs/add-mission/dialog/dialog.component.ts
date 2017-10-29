import { Component } from '@angular/core';
import { MdDialogRef, MdRadioModule } from '@angular/material';
import { NgForm } from '@angular/forms';
import { MissionService} from '../../../_services/index';
import { StepState, CovalentStepsModule } from '@covalent/core';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [MissionService]
})
export class DialogComponent {
  type: Number;

  constructor(public dialogRef: MdDialogRef<DialogComponent>,
    private misisonService: MissionService) { }
    activeDeactiveStep1Msg: string = 'No select/deselect detected yet';
    stateStep2: StepState = StepState.Required;
    stateStep3: StepState = StepState.Complete;
    disabled: boolean = false;

  cancel(): void {
    this.dialogRef.close();
  }
  
  onSubmit(f: NgForm): void {
    // this.misisonService.addMIssionType(f.value);
    // this.sidebarService.refresh(f.value);
    console.log(f.value);
    this.dialogRef.close();
  }

  toggleRequiredStep2(): void {
    this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
  }

  toggleCompleteStep3(): void {
    this.stateStep3 = (this.stateStep3 === StepState.Complete ? StepState.None : StepState.Complete);
  }

  activeStep1Event(): void {
    this.activeDeactiveStep1Msg = 'Active event emitted.';
  }

  deactiveStep1Event(): void {
    this.activeDeactiveStep1Msg = 'Deactive event emitted.';
  }
}
