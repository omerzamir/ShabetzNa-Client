import { Component, OnInit } from '@angular/core';
import { MiniCalendarService } from '../../../_services/index';

@Component({
  selector: 'app-mini-calendar',
  templateUrl: './mini-calendar.component.html',
  styleUrls: ['./mini-calendar.component.css']
})
export class MiniCalendarComponent implements OnInit {

  private selectedDate: Date = new Date();

  constructor(private miniCalendarService: MiniCalendarService) { }

  ngOnInit() {
  }

  onClick(): void {
    // send date to subscribers via observable subject
    this.miniCalendarService.changeDate(this.selectedDate);
  }
}
