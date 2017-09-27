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
  rawMissionTypes;
  missionTypes;
  constructor(private missionTypesService: MissionTypesService) {
    // (this.rawMissionTypes).forEach(e => {
    //   this.missionTypes.push(e);
    // });
  }

  ngOnInit(): void {
    this.missionTypesService.getMissionTypes().subscribe((data) => {
      this.missionTypes = data;
      console.log(this.missionTypes);
    });
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
