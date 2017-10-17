import { Component} from '@angular/core';
import { MdDialogRef, MdRadioModule } from '@angular/material';

@Component({
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{
  type: Number;
  constructor(public dialogRef: MdDialogRef<DialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
