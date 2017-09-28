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
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarDateFormatter,
  DAYS_OF_WEEK,
  CalendarMonthViewDay
} from 'angular-calendar';
import { Subscription } from 'rxjs/Subscription';
import { MiniCalendarService } from '../_services/index';
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
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatter
    }
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class CalendarComponent implements OnDestroy {
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
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
  ];

  viewDate: Date = new Date();
  activeDayIsOpen: boolean = true;
  subscription: Subscription;

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    this.events = [];
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
    });
  }

  constructor(private modal: NgbModal, private miniCalendarService: MiniCalendarService) {
    // subscribe to home component messages
    this.subscription = this.miniCalendarService.getDate().subscribe((date) => {
      if (date.newDate != 'Invalid Date') {
        // if month or year has changed
        // if (this.viewDate.getMonth() !== date.newDate.getMonth() || this.viewDate.getFullYear() !== date.newDate.getFullYear()) {

        //   // Create hebrew date obj
        //   let heb = new Hebcal;

        //   // for each day in current month
        //   for (let i = 1; i <= moment(date.newDate.getFullYear() + '-' + (date.newDate.getMonth() + 1), 'YYYY-MM').daysInMonth(); i++) {

        //     // set the date
        //     heb.setGdate(i, date.newDate.getMonth() + 1, date.newDate.getFullYear());

        //     // if there is a holiday at this date
        //     if (Number(heb.getHolyday(heb, false)) !== 0) {
        //       this.events.push({
        //         start: new Date(date.newDate.getFullYear(), date.newDate.getMonth(), i),
        //         end: new Date(date.newDate.getFullYear(), date.newDate.getMonth(), i),
        //         title: heb.getHolydayName(heb.getHolyday(heb, false)),
        //         color: colors.yellow,
        //         actions: this.actions
        //       });
        //     }
        //   }
        // }
        this.viewDate = date.newDate;
        this.refresh.next();
      }
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    this.events = [];
  }

  // ngOnInit() {
  //   // let heb = new Hebcal;
  //   // for (let i = 1; i <= moment(this.viewDate.getFullYear() + '-' + (this.viewDate.getMonth() + 1), 'YYYY-MM').daysInMonth(); i++) {
  //   //   heb.setGdate(i, this.viewDate.getMonth() + 1, this.viewDate.getFullYear());
  //   //   if (heb.getHolyday(heb, false) !== 0) {
  //   //     this.addEvent({
  //   //       start: new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, i),
  //   //       end: new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, i),
  //   //       title: heb.getHolydayName(heb.getHolyday(heb, false)),
  //   //       color: colors.yellow,
  //   //       actions: this.actions
  //   //     });
  //   //   }
  //   // }
  //   // this.refresh.next();
  // }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(event): void {
    this.events.push(event);
    this.refresh.next();
  }
}
