import { Component, OnInit } from '@angular/core';
import { MiniCalendarComponent } from './mini-calendar/mini-calendar.component';
import { MissionTypesService, SidebarService } from '../../_services/index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [
    MiniCalendarComponent,
    MissionTypesService,
    SidebarService
  ]
})
export class SidebarComponent implements OnInit {
  typesOfMission;
  missionTypes;
  selectedTypesId: string[];
  constructor(private missionTypesService: MissionTypesService, private sidebarService: SidebarService) {
    this.selectedTypesId = [];
  }

  ngOnInit(): void {
    this.missionTypesService.getMissionTypes().subscribe((data) => {
      this.missionTypes = data;
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

  onClick(selected): void {
    if(this.selectedTypesId.includes(selected._id)) {
      this.selectedTypesId = this.selectedTypesId.filter((val:string)=> {
        return val != selected._id;
      });
    }
    else {
      this.selectedTypesId.push(selected._id);      
    }

    this.sidebarService.sendFilter(this.selectedTypesId);
  }
}
