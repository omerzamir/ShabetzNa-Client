import { Component, OnInit, ViewChild } from '@angular/core';
import { MiniCalendarService } from '../../../_services/index';
import { MdCalendar, DateAdapter } from '@angular/material';
// import * as moment from 'moment';
@Component({
  selector: 'app-mini-calendar',
  moduleId: module.id,
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.css']
})
export class MiniCalendarComponent implements OnInit {

  constructor(private miniCalendarService: MiniCalendarService,
    dateAdapter: DateAdapter<Date>) {
    // dateAdapter.setLocale('he');
  }

  ngOnInit() {
  }

  onClick(event): void {
    // send date to subscribers via observable subject
    if (event &&
      event.target &&
      event.target.offsetParent &&
      event.target.offsetParent.attributes['aria-label']) {

      // const date: any = moment(event.target.offsetParent.attributes['aria-label'].value, "DD YYYY MMMM").toString();
      // console.log(date);
      const date: string = event.target.offsetParent.attributes['aria-label'].value;
      if (new Date(date).toDateString() !== "Invalid Date")
        this.miniCalendarService.changeDate(new Date(date));
    }
  }
}
