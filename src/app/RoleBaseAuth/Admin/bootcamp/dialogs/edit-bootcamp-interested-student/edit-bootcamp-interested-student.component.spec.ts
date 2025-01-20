import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBootcampInterestedStudentComponent } from './edit-bootcamp-interested-student.component';

describe('EditBootcampInterestedStudentComponent', () => {
  let component: EditBootcampInterestedStudentComponent;
  let fixture: ComponentFixture<EditBootcampInterestedStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBootcampInterestedStudentComponent]
    });
    fixture = TestBed.createComponent(EditBootcampInterestedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
