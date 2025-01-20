import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewIssuesComponent } from './edit-new-issues.component';

describe('EditNewIssuesComponent', () => {
  let component: EditNewIssuesComponent;
  let fixture: ComponentFixture<EditNewIssuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditNewIssuesComponent]
    });
    fixture = TestBed.createComponent(EditNewIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
