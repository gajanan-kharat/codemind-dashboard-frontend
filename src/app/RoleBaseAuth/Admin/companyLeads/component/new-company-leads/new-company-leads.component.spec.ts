import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompanyLeadsComponent } from './new-company-leads.component';

describe('NewCompanyLeadsComponent', () => {
  let component: NewCompanyLeadsComponent;
  let fixture: ComponentFixture<NewCompanyLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewCompanyLeadsComponent]
    });
    fixture = TestBed.createComponent(NewCompanyLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
