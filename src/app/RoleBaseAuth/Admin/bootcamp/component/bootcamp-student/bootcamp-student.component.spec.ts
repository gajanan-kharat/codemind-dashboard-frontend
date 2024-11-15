import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampStudentComponent } from './bootcamp-student.component';

describe('BootcampStudentComponent', () => {
  let component: BootcampStudentComponent;
  let fixture: ComponentFixture<BootcampStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BootcampStudentComponent]
    });
    fixture = TestBed.createComponent(BootcampStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
