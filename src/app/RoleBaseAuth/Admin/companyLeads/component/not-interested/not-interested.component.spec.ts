import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotInterestedComponent } from './not-interested.component';

describe('NotInterestedComponent', () => {
  let component: NotInterestedComponent;
  let fixture: ComponentFixture<NotInterestedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotInterestedComponent]
    });
    fixture = TestBed.createComponent(NotInterestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
