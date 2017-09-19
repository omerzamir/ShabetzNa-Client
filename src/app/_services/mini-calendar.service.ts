import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MiniCalendarService {
  private subject = new Subject<any>();
  
  changeDate(date: Date) {
      this.subject.next({ newDate: date });
  }

  clearDate() {
      this.subject.next();
  }

  getDate(): Observable<any> {
      return this.subject.asObservable();
  }

}
