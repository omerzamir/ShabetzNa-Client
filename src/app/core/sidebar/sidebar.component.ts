import { Component, OnInit } from '@angular/core';
import { MiniCalendarComponent } from './mini-calendar/mini-calendar.component';
import { MissionTypesService } from '../../_services/index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [
    MiniCalendarComponent,
    MissionTypesService
  ]
})
export class SidebarComponent implements OnInit {
  typesOfMission;
  missionTypes;
  // constructor() {}
  constructor(private missionTypesService: MissionTypesService) {
    this.missionTypesService.getMissionTypes().subscribe(data => {
      this.missionTypes = data;
      console.log(data);
    });
  }

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
