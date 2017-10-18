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
  rerender = false;
  selectedTypesId: string[];
  sidebarSubscription: Subscription;
  
  ngOnDestroy(): void {
    this.sidebarSubscription.unsubscribe();
  }
  
  constructor(private missionTypesService: MissionTypesService,
    private sidebarService: SidebarService,
    private cdRef: ChangeDetectorRef) {
    this.selectedTypesId = [];

    this.sidebarSubscription = this.sidebarService.getRefresh().subscribe((d) => {
      console.log("dfg")
      this.rerender = true;
      this.cdRef.detectChanges();
      this.rerender = false;
    });

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
}
