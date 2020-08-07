import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMeetupComponent } from './view-meetup.component';

describe('ViewMeetupComponent', () => {
  let component: ViewMeetupComponent;
  let fixture: ComponentFixture<ViewMeetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMeetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMeetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
