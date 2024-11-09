import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollegeInfoComponent } from './edit-college-info.component';

describe('EditCollegeInfoComponent', () => {
  let component: EditCollegeInfoComponent;
  let fixture: ComponentFixture<EditCollegeInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCollegeInfoComponent]
    });
    fixture = TestBed.createComponent(EditCollegeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
