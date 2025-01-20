import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLeadsComponent } from './main-leads.component';

describe('MainLeadsComponent', () => {
  let component: MainLeadsComponent;
  let fixture: ComponentFixture<MainLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainLeadsComponent]
    });
    fixture = TestBed.createComponent(MainLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
