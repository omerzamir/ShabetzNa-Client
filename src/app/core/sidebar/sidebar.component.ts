import { Component, OnInit } from '@angular/core';
import { MiniCalendarComponent } from './mini-calendar/mini-calendar.component';
// import { MissionTypesService } from '../../_services/index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [
    MiniCalendarComponent,
    // MissionTypesService
  ]
})
export class SidebarComponent implements OnInit {
  typesOfMission;
  missionTypes;
  constructor() {}
  // constructor(private missionTypesService: MissionTypesService) {
    // this.missionTypes = this.missionTypesService.getMissionTypes();
  //}

  ngOnInit() {
    this.typesOfMission = [
      {
        code: 0,
        text: 'חובה'
      },
      {
        code: 1,
        text: 'קבע'
      }
    ];
  }
}
