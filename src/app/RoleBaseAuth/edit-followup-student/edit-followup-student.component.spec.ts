import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFollowupStudentComponent } from './edit-followup-student.component';

describe('EditFollowupStudentComponent', () => {
  let component: EditFollowupStudentComponent;
  let fixture: ComponentFixture<EditFollowupStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFollowupStudentComponent]
    });
    fixture = TestBed.createComponent(EditFollowupStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
