import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarService {
    private subject = new Subject<Array<string>>();
    private refreshSubject = new Subject<{}>();

    sendFilter(ids: string[]) {
        this.subject.next(ids);
    }

    getfilter(): Observable<Array<string>> {
        return this.subject.asObservable();
    }

    refresh(f: {}): void {
        this.refreshSubject.next(f);
    }

    getRefresh(): Observable<{}> {
        return this.refreshSubject.asObservable();
    }
}
