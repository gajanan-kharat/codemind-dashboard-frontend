import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BootcampNotinterestedStudentComponent } from './bootcamp-notinterested-student.component';

describe('BootcampNotinterestedStudentComponent', () => {
  let component: BootcampNotinterestedStudentComponent;
  let fixture: ComponentFixture<BootcampNotinterestedStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BootcampNotinterestedStudentComponent]
    });
    fixture = TestBed.createComponent(BootcampNotinterestedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
