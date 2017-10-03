import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SidebarService {
  private subject = new Subject<any>();

  sendFilter(ids: string[]) {
      this.subject.next({ids: ids});
  }

  getfilter(): Observable<any> {
      return this.subject.asObservable();
  }
}
