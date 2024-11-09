import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInterestedComponent } from './edit-interested.component';

describe('EditInterestedComponent', () => {
  let component: EditInterestedComponent;
  let fixture: ComponentFixture<EditInterestedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInterestedComponent]
    });
    fixture = TestBed.createComponent(EditInterestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
