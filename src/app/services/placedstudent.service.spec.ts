import { TestBed } from '@angular/core/testing';

import { PlacedstudentService } from './placedstudent.service';

describe('PlacedstudentService', () => {
  let service: PlacedstudentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlacedstudentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
