import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBootcampNotinterestedStudentComponent } from './edit-bootcamp-notinterested-student.component';

describe('EditBootcampNotinterestedStudentComponent', () => {
  let component: EditBootcampNotinterestedStudentComponent;
  let fixture: ComponentFixture<EditBootcampNotinterestedStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBootcampNotinterestedStudentComponent]
    });
    fixture = TestBed.createComponent(EditBootcampNotinterestedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
