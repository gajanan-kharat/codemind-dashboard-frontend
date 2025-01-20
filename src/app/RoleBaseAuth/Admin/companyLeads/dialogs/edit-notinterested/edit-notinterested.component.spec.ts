import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotinterestedComponent } from './edit-notinterested.component';

describe('EditNotinterestedComponent', () => {
  let component: EditNotinterestedComponent;
  let fixture: ComponentFixture<EditNotinterestedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNotinterestedComponent]
    });
    fixture = TestBed.createComponent(EditNotinterestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
