import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MiniCalendarComponent } from './mini-calendar/mini-calendar.component';
import { MissionTypesService, SidebarService } from '../../_services/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [
    MissionTypesService
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {
  typesOfMission;
  missionTypes;
  selectedTypesId: string[];
  sidebarSubscription: Subscription;

  ngOnDestroy(): void {
    this.sidebarSubscription.unsubscribe();
  }

  constructor(private missionTypesService: MissionTypesService,
    private sidebarService: SidebarService
  ) {
    this.selectedTypesId = [];

    this.sidebarSubscription = this.sidebarService.getRefresh().subscribe((d) => {
      this.missionTypes.push(d);
    });

  }

  ngOnInit(): void {
    this.fetchTypes();  

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
    if (this.selectedTypesId.includes(selected._id)) {
      this.selectedTypesId = this.selectedTypesId.filter((val: string) => {
        return val != selected._id;
      });
    }
    else {
      this.selectedTypesId.push(selected._id);
    }
    this.sidebarService.sendFilter(this.selectedTypesId);
  }

  fetchTypes(): void {
    this.missionTypesService.getMissionTypes().subscribe((data) => {
      this.missionTypes = data;
    });
  }

}