import { Component} from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';


@Component({
  selector: 'app-add-missionType',
  templateUrl: './add-missionType.component.html',
  styleUrls: ['./add-missionType.component.css']
})
export class AddMissionTypeComponent{

  constructor(private dialog: MdDialog) { }
  
    openDialog() {
      let dialogRef = this.dialog.open(DialogComponent, { width: '250px' });
  
      dialogRef.afterClosed().subscribe(result => {
  
      });
    }

}
