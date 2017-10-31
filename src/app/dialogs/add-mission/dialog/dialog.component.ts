import { Component, ChangeDetectorRef } from '@angular/core';
import { MdDialogRef, MdRadioModule } from '@angular/material';
import { NgForm, FormControl } from '@angular/forms';
import { MissionService, MissionTypesService, UserService } from '../../../_services/index';
import { StepState } from '@covalent/core';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [MissionService, MissionTypesService, UserService]
})
export class DialogComponent {
  type: Number = 3;
  options;
  selectedMission: String;
  startDateStr: string;
  startDate: Date;
  endDate: Date;
  soldiers: Array<string> = [];
  users: any;
  filteredUsers: any;
  userSearch: FormControl;

  constructor(public dialogRef: MdDialogRef<DialogComponent>,
    private misisonService: MissionService,
    private cdRef: ChangeDetectorRef,
    private missionTypesService: MissionTypesService,
    private userService: UserService) {


    this.missionTypesService.getMissionTypes().subscribe((data) => {
      this.options = data;
    });
    this.userSearch = new FormControl;
    this.users = this.userService.getAllUsers();
    this.filteredUsers = this.users;
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
    this.stateStep3 = StepState.None;
  }

  activeStep0Event(): void {
    this.activeStep = 0;
  }

  deactiveStep0Event(): void {
    if (this.selectedMission) {
      this.stateStep1 = StepState.Complete;
    } else {
      this.stateStep1 = StepState.Required;
    }
  }
  deactiveStep1Event(): void {
    if (this.startDate && this.endDate != undefined && this.soldiers.length != 0) {
      this.stateStep2 = StepState.Complete;
    } else {
      this.stateStep2 = StepState.Required;
    }
  }
  deactiveStep2Event(): void {
    this.stateStep3 = StepState.Complete;
  }
  nextStep() {
    this.activeStep++;
    this.cdRef.detectChanges();
  }

  sendToAddSoldier() {
    this.activeStep = 2;
    this.cdRef.detectChanges();
  }

  filterUsers(val: string) {
    debugger;    
      if (val) {
        const filterValue = val.toLowerCase();
        return this.users.filter(user => user.hierarchy.join('/').toLowerCase().includes(filterValue));
      }
      return this.users;
  }

}
