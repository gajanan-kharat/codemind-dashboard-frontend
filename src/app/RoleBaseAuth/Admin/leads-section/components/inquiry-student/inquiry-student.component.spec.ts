import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryStudentComponent } from './inquiry-student.component';

describe('InquiryStudentComponent', () => {
  let component: InquiryStudentComponent;
  let fixture: ComponentFixture<InquiryStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InquiryStudentComponent]
    });
    fixture = TestBed.createComponent(InquiryStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
