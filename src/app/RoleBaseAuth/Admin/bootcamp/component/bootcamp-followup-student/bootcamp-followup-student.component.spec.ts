import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampFollowupStudentComponent } from './bootcamp-followup-student.component';

describe('BootcampFollowupStudentComponent', () => {
  let component: BootcampFollowupStudentComponent;
  let fixture: ComponentFixture<BootcampFollowupStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BootcampFollowupStudentComponent]
    });
    fixture = TestBed.createComponent(BootcampFollowupStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
