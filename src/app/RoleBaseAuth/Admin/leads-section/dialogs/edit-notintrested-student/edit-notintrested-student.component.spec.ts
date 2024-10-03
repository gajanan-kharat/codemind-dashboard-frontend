import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotintrestedStudentComponent } from './edit-notintrested-student.component';

describe('EditNotintrestedStudentComponent', () => {
  let component: EditNotintrestedStudentComponent;
  let fixture: ComponentFixture<EditNotintrestedStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNotintrestedStudentComponent]
    });
    fixture = TestBed.createComponent(EditNotintrestedStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
