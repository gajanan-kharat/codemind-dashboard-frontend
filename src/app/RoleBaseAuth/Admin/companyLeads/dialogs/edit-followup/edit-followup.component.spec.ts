import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFollowupComponent } from './edit-followup.component';

describe('EditFollowupComponent', () => {
  let component: EditFollowupComponent;
  let fixture: ComponentFixture<EditFollowupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFollowupComponent]
    });
    fixture = TestBed.createComponent(EditFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
