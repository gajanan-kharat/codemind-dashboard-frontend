import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIssuesComponent } from './new-issues.component';

describe('NewIssuesComponent', () => {
  let component: NewIssuesComponent;
  let fixture: ComponentFixture<NewIssuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewIssuesComponent]
    });
    fixture = TestBed.createComponent(NewIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
