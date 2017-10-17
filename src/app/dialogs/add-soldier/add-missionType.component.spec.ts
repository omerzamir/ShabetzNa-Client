import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMissionTypeComponent } from './add-missionType.component';

describe('AddSoldierComponent', () => {
  let component: AddMissionTypeComponent;
  let fixture: ComponentFixture<AddMissionTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMissionTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMissionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
