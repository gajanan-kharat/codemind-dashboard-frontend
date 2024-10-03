import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestedStudentComponent } from './interested-student.component';

describe('InterestedStudentComponent', () => {
  let component: InterestedStudentComponent;
  let fixture: ComponentFixture<InterestedStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterestedStudentComponent]
    });
    fixture = TestBed.createComponent(InterestedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
