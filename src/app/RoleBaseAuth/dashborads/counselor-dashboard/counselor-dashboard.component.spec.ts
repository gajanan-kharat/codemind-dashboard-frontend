import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselorDashboardComponent } from './counselor-dashboard.component';

describe('CounselorDashboardComponent', () => {
  let component: CounselorDashboardComponent;
  let fixture: ComponentFixture<CounselorDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounselorDashboardComponent]
    });
    fixture = TestBed.createComponent(CounselorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
