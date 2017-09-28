import { TestBed, inject } from '@angular/core/testing';

import { MiniCalendarService } from './mini-calendar.service';

describe('MiniCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MiniCalendarService]
    });
  });

  it('should be created', inject([MiniCalendarService], (service: MiniCalendarService) => {
    expect(service).toBeTruthy();
  }));

  // should send a date to the service

  // should get the date that was submitted earlier

  // Should clear the Dates sent - observable.next()

});
