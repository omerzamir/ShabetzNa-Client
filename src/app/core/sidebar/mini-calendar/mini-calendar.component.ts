import { Component, OnInit} from '@angular/core';
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

  onClick(event): void {
    // send date to subscribers via observable subject
    let date: any = event.srcElement.offsetParent.attributes["aria-label"].value;
    if(date) {
      this.miniCalendarService.changeDate(new Date(date));
    }
  }
}
