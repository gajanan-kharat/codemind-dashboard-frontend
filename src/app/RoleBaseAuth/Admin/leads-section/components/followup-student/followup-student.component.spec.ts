import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupStudentComponent } from './followup-student.component';

describe('FollowupStudentComponent', () => {
  let component: FollowupStudentComponent;
  let fixture: ComponentFixture<FollowupStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FollowupStudentComponent]
    });
    fixture = TestBed.createComponent(FollowupStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
