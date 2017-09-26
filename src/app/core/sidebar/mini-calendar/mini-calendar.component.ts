import { Component, OnInit, ViewChild } from '@angular/core';
import { MiniCalendarService } from '../../../_services/index';
import { MdCalendar } from '@angular/material';

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
    if (event &&
      event.target &&
      event.target.offsetParent &&
      event.target.offsetParent.attributes['aria-label'] &&
      new Date(event.target.offsetParent.attributes['aria-label'].value) instanceof Date) {

      const date: any = event.target.offsetParent.attributes['aria-label'].value;
      this.miniCalendarService.changeDate(new Date(date));
    }
  }
}
