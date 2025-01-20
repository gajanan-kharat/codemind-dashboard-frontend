import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentIssusesDashboardComponent } from './student-issuses-dashboard.component';

describe('StudentIssusesDashboardComponent', () => {
  let component: StudentIssusesDashboardComponent;
  let fixture: ComponentFixture<StudentIssusesDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentIssusesDashboardComponent]
    });
    fixture = TestBed.createComponent(StudentIssusesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
