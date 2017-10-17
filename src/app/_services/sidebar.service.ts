import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class SidebarService {
    private subject = new ReplaySubject<Array<string>>();

    sendFilter(ids: string[]) {
        this.subject.next(ids);
    }

    getfilter(): Observable<Array<string>> {
        return this.subject.asObservable();
    }
}
