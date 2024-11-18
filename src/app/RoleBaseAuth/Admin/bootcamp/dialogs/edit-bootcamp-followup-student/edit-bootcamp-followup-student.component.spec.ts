import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBootcampFollowupStudentComponent } from './edit-bootcamp-followup-student.component';

describe('EditBootcampFollowupStudentComponent', () => {
  let component: EditBootcampFollowupStudentComponent;
  let fixture: ComponentFixture<EditBootcampFollowupStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBootcampFollowupStudentComponent]
    });
    fixture = TestBed.createComponent(EditBootcampFollowupStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
