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
import { MiniCalendarService, MissionService } from '../_services/index';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import * as Hebcal from 'libhdate';
import * as moment from 'moment';

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
    MissionService
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

  // events: CalendarEvent[] = [
  // ];
  events$: Observable<Array<CalendarEvent<{ event: Mission }>>>;

  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  subscription: Subscription;

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    let heb = new Hebcal;
    body.forEach(day => {
      heb.setGdate(day.date.getDate(), day.date.getMonth() + 1, day.date.getFullYear());
      if (heb.getHolyday(heb, false) !== 0) {
        day.events.push({
          start: new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate()),
          end: new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate()),
          title: heb.getHolydayName(heb.getHolyday(heb, false)),
          color: colors.yellow,
          actions: this.actions
        });
      }

      // const daysInMonth = moment(this.viewDate.getFullYear() + '-' + this.viewDate.getMonth(), 'YYYY-MM').daysInMonth();
      // console.log(daysInMonth);
      // new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDay(), 0, 0, 0),
      // new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDay(), 23, 59, 59))

    });
  }

  constructor(private modal: NgbModal, private miniCalendarService: MiniCalendarService, private missionService: MissionService) {
    // subscribe to home component messages
    this.subscription = this.miniCalendarService.getDate().subscribe((date) => {
      if (date.newDate != 'Invalid Date') {
        this.viewDate = date.newDate;
        this.refresh.next();
      }
    });
    const daysInMonth = moment(this.viewDate.getFullYear() + '-' + this.viewDate.getMonth(), 'YYYY-MM').daysInMonth();
    this.missionService.getMissionsByRange(
      new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 0, 0, 0, 0),
      new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), daysInMonth, 23, 59, 59))
      .subscribe((data) => {
        for (let e of data) {
          // this.events$.push({
          //   start: e.startDate,
          //   end: e.endDate,
          //   title: 'test',
          //   color: colors.red,
          //   actions: this.actions
          // });
          this.refresh.next();
        }
      });
    this.refresh.next();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    this.events$ = undefined;
  }

  ngOnInit() {
    this.fetchEvents();
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

    const daysInMonth = moment(this.viewDate.getFullYear() + '-' + this.viewDate.getMonth(), 'YYYY-MM').daysInMonth();
    this.events$ = this.missionService.getMissionsByRange(
      new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 0, 0, 0, 0),
      new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), daysInMonth, 23, 59, 59))
      .map(( results: Mission[] ) => {
        return results.map((event: Mission) => {
          return {
            title: "test",
              start: new Date(event.startDate),
              end: new Date(event.endDate),
              color: colors.yellow,
              meta: {
                event
              }
          };
        });
      });
    // this.events$ = this.missionService.getMissionsByRange(
    //   new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), 0, 0, 0, 0),
    //   new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), daysInMonth, 23, 59, 59))
    //   .subscribe(({ results }: { results: Mission[] }) => {
    //     return results.map((mission: Mission) => {
    //       return {
    //         title: "test",
    //         start: new Date(mission.startDate),
    //         end: new Date(mission.endDate),
    //         color: colors.yellow,
    //         meta: {
    //           mission
    //         }
    //       };
    //     });
    //   });
  }


  dayClicked({ date, events }: { date: Date; events:  Array<CalendarEvent<{ mission: Mission }>> }): void {
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
    // this.events$.push(event);
    this.refresh.next();
  }
}
