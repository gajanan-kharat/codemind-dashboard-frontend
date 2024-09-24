import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentReviewsComponent } from './student-reviews.component';

describe('StudentReviewsComponent', () => {
  let component: StudentReviewsComponent;
  let fixture: ComponentFixture<StudentReviewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentReviewsComponent]
    });
    fixture = TestBed.createComponent(StudentReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
