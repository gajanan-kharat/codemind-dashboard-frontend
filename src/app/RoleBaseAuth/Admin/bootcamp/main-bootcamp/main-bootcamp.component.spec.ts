import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBootcampComponent } from './main-bootcamp.component';

describe('MainBootcampComponent', () => {
  let component: MainBootcampComponent;
  let fixture: ComponentFixture<MainBootcampComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainBootcampComponent]
    });
    fixture = TestBed.createComponent(MainBootcampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
