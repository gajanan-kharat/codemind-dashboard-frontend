import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBootcampStudentComponent } from './edit-bootcamp-student.component';

describe('EditBootcampStudentComponent', () => {
  let component: EditBootcampStudentComponent;
  let fixture: ComponentFixture<EditBootcampStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBootcampStudentComponent]
    });
    fixture = TestBed.createComponent(EditBootcampStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
