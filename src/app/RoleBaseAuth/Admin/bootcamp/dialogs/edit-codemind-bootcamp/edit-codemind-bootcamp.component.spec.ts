import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCodemindBootcampComponent } from './edit-codemind-bootcamp.component';

describe('EditCodemindBootcampComponent', () => {
  let component: EditCodemindBootcampComponent;
  let fixture: ComponentFixture<EditCodemindBootcampComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCodemindBootcampComponent]
    });
    fixture = TestBed.createComponent(EditCodemindBootcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
