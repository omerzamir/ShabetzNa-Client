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

    transform(toFilter: any, by: any): any {
        // If there is nothing to filter return an empty array.
        if (!toFilter) return [];

        // If there is no values to filter by return the array as you got it.
        if (!by || by.length == 0) return toFilter;

        // For each value in the array to filter.
        let filtered = toFilter.filter(val => {
            // check if exist in the filterby array If not escaped false is returned.
            for (let comp of by) {
                // If the type of the event equals the filterby type currently checked.
                if (val.meta.event.type == comp) {
                    return true;
                }
            }
            return false;
        });

        return filtered;
    }
}
