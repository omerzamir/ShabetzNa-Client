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
});
