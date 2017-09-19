import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCalendarComponent } from './mini-calendar.component';

describe('MiniCalendarComponent', () => {
  let component: MiniCalendarComponent;
  let fixture: ComponentFixture<MiniCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
