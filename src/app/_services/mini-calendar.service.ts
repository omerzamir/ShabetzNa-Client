import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MiniCalendarService {
    private subject = new Subject<any>();

    changeDate(date: Date) {
        this.subject.next({ newDate: date });
    }

    getDate(): Observable<any> {
        return this.subject.asObservable();
    }
}
