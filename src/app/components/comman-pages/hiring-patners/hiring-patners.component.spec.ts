import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringPatnersComponent } from './hiring-patners.component';

describe('HiringPatnersComponent', () => {
  let component: HiringPatnersComponent;
  let fixture: ComponentFixture<HiringPatnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HiringPatnersComponent]
    });
    fixture = TestBed.createComponent(HiringPatnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
