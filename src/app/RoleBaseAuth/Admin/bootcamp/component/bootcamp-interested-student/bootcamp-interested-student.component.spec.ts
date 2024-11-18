import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampInterestedStudentComponent } from './bootcamp-interested-student.component';

describe('BootcampInterestedStudentComponent', () => {
  let component: BootcampInterestedStudentComponent;
  let fixture: ComponentFixture<BootcampInterestedStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BootcampInterestedStudentComponent]
    });
    fixture = TestBed.createComponent(BootcampInterestedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
