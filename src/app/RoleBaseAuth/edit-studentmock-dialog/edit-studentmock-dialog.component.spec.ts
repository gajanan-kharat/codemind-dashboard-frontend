import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentmockDialogComponent } from './edit-studentmock-dialog.component';

describe('EditStudentmockDialogComponent', () => {
  let component: EditStudentmockDialogComponent;
  let fixture: ComponentFixture<EditStudentmockDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStudentmockDialogComponent]
    });
    fixture = TestBed.createComponent(EditStudentmockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
