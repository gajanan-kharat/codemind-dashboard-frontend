import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInterestedStudentComponent } from './edit-interested-student.component';

describe('EditInterestedStudentComponent', () => {
  let component: EditInterestedStudentComponent;
  let fixture: ComponentFixture<EditInterestedStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInterestedStudentComponent]
    });
    fixture = TestBed.createComponent(EditInterestedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
