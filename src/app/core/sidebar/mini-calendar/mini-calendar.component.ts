import { Component, OnInit } from '@angular/core';
import { MiniCalendarService } from '../../../_services/index';
import { MdDatepickerModule, MdCalendar } from '@angular/material'

@Component({
  selector: 'app-mini-calendar',
  moduleId: module.id,
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.css']
})
export class MiniCalendarComponent implements OnInit {

  private selectedDate: Date;

  constructor(private miniCalendarService: MiniCalendarService) { }
  
  ngOnInit() {
  }

  onClick(): void {
    // if(this.selectedDate instanceof Date){
      // send date to subscribers via observable subject
      console.log();
      // this.miniCalendarService.changeDate(new Date(this.selectedDate));
    // }
    
  }
    
}