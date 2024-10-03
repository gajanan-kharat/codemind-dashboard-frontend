import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotinterestedStudentComponent } from './notinterested-student.component';

describe('NotinterestedStudentComponent', () => {
  let component: NotinterestedStudentComponent;
  let fixture: ComponentFixture<NotinterestedStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotinterestedStudentComponent]
    });
    fixture = TestBed.createComponent(NotinterestedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
