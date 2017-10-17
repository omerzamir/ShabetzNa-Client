import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK,
  CalendarMonthViewDay, CalendarUtils
} from 'angular-calendar';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { MiniCalendarService, MissionService, MissionTypesService, SidebarService } from '../_services/index';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import * as Hebcal from 'libhdate';
import * as moment from 'moment';
import { Filter } from './missionFilter.pipe';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

interface Mission {
  id: string;
  type: string;
  startDate: Date;
  endDate: Date;
  status: number;
  participents: string[];
}

interface MissionType {
  _id: string;
  name: string;
  description: string;
  type: number;
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    },
    MissionService,
    MissionTypesService,
    Filter
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class CalendarComponent implements OnDestroy, OnInit {
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: string = 'month';

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  hebdate: any = new Hebcal;

  locale: string = 'he';
  weekStartsOn: number = DAYS_OF_WEEK.SUNDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.FRIDAY, DAYS_OF_WEEK.SATURDAY];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent<{ mission: Mission }> }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent<{ mission: Mission }> }): void => {
        // this.events$ = this.events$.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events$: Observable<Array<CalendarEvent<{ event: Mission }>>>;
  types: MissionType[];

  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  subscription: Subscription;
  sidebarSubscription: Subscription;
  filterBy: string[];
  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    let heb = new Hebcal;
    body.forEach(day => {
      heb.setGdate(day.date.getDate(), day.date.getMonth() + 1, day.date.getFullYear());
      if (heb.getHolyday(heb, false) !== 0) {
        let d = day.events.map(res => res);
        day.events.push({
          start: new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate()),
          end: new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate()),
          title: heb.getHolydayName(heb.getHolyday(heb, false)),
          color: colors.yellow,
          actions: this.actions
        });
        // this.events$.subscribe(value => {
        //   return {
        //     start: new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate()),
        //     end: new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate()),
        //     title: heb.getHolydayName(heb.getHolyday(heb, false)),
        //     color: colors.yellow,
        //     actions: this.actions
        //   }
        // });
      }
    });
  }

  constructor(private modal: NgbModal,
    private miniCalendarService: MiniCalendarService,
    private missionService: MissionService,
    private missionTypeService: MissionTypesService,
    private sidebarService: SidebarService) {
    // subscribe to home component messages
    this.subscription = this.miniCalendarService.getDate().subscribe((date) => {
      if (date.newDate != 'Invalid Date') {
        this.viewDate = date.newDate;
        this.fetchEvents();
        this.refresh.next();
      }
    });
    
    this.sidebarSubscription = this.sidebarService.getfilter().subscribe(ids => {
      this.filterBy = ids;
      // fetch the events in order to filter all of them and not only the remaining.
      this.fetchEvents();      
      this.refresh.next();      
    });
    this.refresh.next();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    this.sidebarSubscription.unsubscribe();
    this.events$ = undefined;
  }

  ngOnInit() {
    this.fetchTypes();
    this.fetchEvents();
  }

  fetchTypes(): void {
    this.missionTypeService.getMissionTypes().subscribe((data) => {
      this.types = data;
    });
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    this.events$ = this.missionService.getMissionsByRange(
      new Date(format(getStart(this.viewDate))),
      new Date(format(getEnd(this.viewDate))))
      .map((results: Mission[]) => {
        return results.map((event: Mission) => {
          let title = "";
          for (let type of this.types) {
            if (type._id === event.type) {
              title = type.name;
            }
          }
          return {
            title: title,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
            color: colors.yellow,
            meta: {
              event
            }
          };
        });
      });
  }


  dayClicked({ date, events }: { date: Date; events: Array<CalendarEvent<{ mission: Mission }>> }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  public changeViewDate(date: Date): void {
    this.viewDate = date;
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent<{ mission: Mission }>): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(event): void {
    this.refresh.next();
  }
}
