import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { 
  MdNativeDateModule,
  MdMenuModule,
  MdButtonModule, 
  MdCheckboxModule, 
  MdToolbarModule,
  MdCardModule,
  MdDialogModule,
  MdChipsModule,
  MdSlideToggleModule,
  MdInputModule,
  MdIconModule,
  MdSelectModule,
  MdAutocompleteModule,
  MdButtonToggleModule,
  MdGridListModule,
  MdListModule,
  MdDatepickerModule,
  MdProgressSpinnerModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MdNativeDateModule,
    MdButtonModule, 
    MdCheckboxModule, 
    MdToolbarModule,
    MdCardModule,
    MdIconModule,
    MdDialogModule,
    MdChipsModule,
    MdSlideToggleModule,
    MdInputModule,
    MdSelectModule,
    MdAutocompleteModule,
    MdButtonToggleModule,
    MdMenuModule,
    MdGridListModule,
    MdListModule,
    MdDatepickerModule,
    MdProgressSpinnerModule
  ],
  exports: [
    MdNativeDateModule,
    MdButtonModule, 
    MdCheckboxModule, 
    MdToolbarModule,
    MdCardModule,
    MdDialogModule,
    MdIconModule,
    MdChipsModule,
    MdSlideToggleModule,
    MdInputModule,
    MdSelectModule,
    MdAutocompleteModule,
    MdButtonToggleModule,
    MdMenuModule,
    MdGridListModule,
    MdListModule,
    MdDatepickerModule,
    MdProgressSpinnerModule
  ]
})

export class MaterialModule {}