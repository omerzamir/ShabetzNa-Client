import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarService {
    private subject = new Subject<Array<string>>();
    private refreshSubject = new Subject<string>();

    sendFilter(ids: string[]) {
        this.subject.next(ids);
    }

    getfilter(): Observable<Array<string>> {
        return this.subject.asObservable();
    }

    refresh(): void {
        this.refreshSubject.next("");
    }

    getRefresh(): Observable<string> {
        return this.refreshSubject.asObservable();
    }
}
