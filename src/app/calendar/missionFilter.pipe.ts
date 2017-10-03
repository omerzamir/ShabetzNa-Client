import { Pipe, PipeTransform } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Pipe({ 
    name: 'filterEvents'
})
export class Filter implements PipeTransform {
    transform(toFilter: any): any {
        // if (by) {
        //     return toFilter.filter((val) => {
        //         for (let comp of by) {
        //             if (val.meta.event._id == comp) {
        //                 return false;
        //             }
        //         }
        //         return true;
        //     });
        // }
        console.log(toFilter);
        return toFilter;
    }
}
