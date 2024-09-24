import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollBtnComponent } from './enroll-btn.component';

describe('EnrollBtnComponent', () => {
  let component: EnrollBtnComponent;
  let fixture: ComponentFixture<EnrollBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrollBtnComponent]
    });
    fixture = TestBed.createComponent(EnrollBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
