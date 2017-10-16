import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Pipe({
    name: 'filterEvents'
})
export class Filter implements PipeTransform {
    transform(toFilter: any, by: any): any {
        console.log(by)
        console.log(toFilter)        
        if (!toFilter) return [];
        if (!by || by === []) return toFilter;
        let filtered = toFilter.filter(val => {
            for (let comp of by) {
                if (val.meta.event.type == comp) {
                    return true;
                }
            }
            return false;
        });
        return filtered;
    }
}
