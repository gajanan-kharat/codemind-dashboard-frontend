import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInquiryStudentComponent } from './edit-inquiry-student.component';

describe('EditInquiryStudentComponent', () => {
  let component: EditInquiryStudentComponent;
  let fixture: ComponentFixture<EditInquiryStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInquiryStudentComponent]
    });
    fixture = TestBed.createComponent(EditInquiryStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
