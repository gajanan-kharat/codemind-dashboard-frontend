import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCompanyLeadsComponent } from './main-company-leads.component';

describe('MainCompanyLeadsComponent', () => {
  let component: MainCompanyLeadsComponent;
  let fixture: ComponentFixture<MainCompanyLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainCompanyLeadsComponent]
    });
    fixture = TestBed.createComponent(MainCompanyLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
