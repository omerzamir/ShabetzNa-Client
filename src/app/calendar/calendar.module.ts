import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule, CalendarUtils } from 'angular-calendar';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MdGridListModule, MdIconModule } from '@angular/material';
import { CalendarComponent, DescriptionDialog } from './calendar.component';
import { Filter } from './missionFilter.pipe'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule.forRoot(),
    CalendarModule.forRoot(),
    MdGridListModule,
    MdIconModule
  ],
  declarations: [
    CalendarComponent, 
    Filter,
    DescriptionDialog
  ],
  exports: [CalendarComponent, DescriptionDialog],
  entryComponents:[DescriptionDialog]
})
export class MyCalendarModule {}
