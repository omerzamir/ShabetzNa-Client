import { Component, OnInit } from '@angular/core';
import { MiniCalendarComponent } from './mini-calendar/mini-calendar.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [MiniCalendarComponent]
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  typesOfMission = ["בדיקה", "בדיקה2"];
  missionTypes = {
    "בדיקה": ["עומר"], 
    "בדיקה2": ["בדיקות"]
  }
}
