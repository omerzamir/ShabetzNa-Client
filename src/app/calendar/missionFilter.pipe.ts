import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { SidebarService } from '../_services/index';
import {
    OnDestroy
} from '@angular/core';
@Pipe({
    name: 'filterEvents'
})
export class Filter implements PipeTransform, OnDestroy {
    by: Array<string>;
    subscription: Subscription;
    constructor(private sidebarService: SidebarService) {
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    transform(toFilter: any): any {
        console.log(toFilter)
        if (!toFilter) return [];

        this.subscription = this.sidebarService.getfilter().subscribe(ids => {
            this.by = ids;
            console.log(this.by);
            if (!this.by || this.by === []) return toFilter;
            let filtered = toFilter.filter(val => {
                for (let comp of this.by) {
                    if (val.meta.event.type == comp) {
                        return true;
                    }
                }
                return false;
            });
            return filtered;
        });
        // console.log(by);

        return toFilter;
    }
}
