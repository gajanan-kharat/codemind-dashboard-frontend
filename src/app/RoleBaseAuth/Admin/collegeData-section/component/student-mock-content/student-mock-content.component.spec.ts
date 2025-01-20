import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMockContentComponent } from './student-mock-content.component';

describe('StudentMockContentComponent', () => {
  let component: StudentMockContentComponent;
  let fixture: ComponentFixture<StudentMockContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentMockContentComponent]
    });
    fixture = TestBed.createComponent(StudentMockContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
