import { Component } from '@angular/core';
import { MdDialogRef, MdRadioModule } from '@angular/material';
import { NgForm } from '@angular/forms';
import { MissionTypesService, SidebarService } from '../../../_services/index';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [MissionTypesService]
})
export class DialogComponent {
  type: Number;
  send:boolean = false;
  constructor(public dialogRef: MdDialogRef<DialogComponent>,
    private misisonTypeService: MissionTypesService,
    private sidebarService: SidebarService) { }

  cancel(): void {
    this.dialogRef.close();
  }
  
  onSubmit(f: NgForm): void {
    this.send = true;
    console.log(this.type, f.value.type);
    if(f.value.name && (f.value.type != undefined && f.value.type != null) && f.value.description) {
      this.misisonTypeService.addMIssionType(f.value);
      this.sidebarService.refresh(f.value);
      this.dialogRef.close();
    }
  }
}
