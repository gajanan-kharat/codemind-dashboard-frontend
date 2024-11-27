import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodemindBootcampComponent } from './codemind-bootcamp.component';

describe('CodemindBootcampComponent', () => {
  let component: CodemindBootcampComponent;
  let fixture: ComponentFixture<CodemindBootcampComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodemindBootcampComponent]
    });
    fixture = TestBed.createComponent(CodemindBootcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
