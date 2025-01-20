import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionExpiryPopupComponent } from './session-expiry-popup.component';

describe('SessionExpiryPopupComponent', () => {
  let component: SessionExpiryPopupComponent;
  let fixture: ComponentFixture<SessionExpiryPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionExpiryPopupComponent]
    });
    fixture = TestBed.createComponent(SessionExpiryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
