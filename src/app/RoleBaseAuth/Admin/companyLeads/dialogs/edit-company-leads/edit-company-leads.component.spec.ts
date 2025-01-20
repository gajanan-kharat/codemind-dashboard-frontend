import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyLeadsComponent } from './edit-company-leads.component';

describe('EditCompanyLeadsComponent', () => {
  let component: EditCompanyLeadsComponent;
  let fixture: ComponentFixture<EditCompanyLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCompanyLeadsComponent]
    });
    fixture = TestBed.createComponent(EditCompanyLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
