import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScholarshipComponent } from './edit-scholarship.component';

describe('EditScholarshipComponent', () => {
  let component: EditScholarshipComponent;
  let fixture: ComponentFixture<EditScholarshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditScholarshipComponent]
    });
    fixture = TestBed.createComponent(EditScholarshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
