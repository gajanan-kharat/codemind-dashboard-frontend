import { TestBed } from '@angular/core/testing';

import { StudentreviewsService } from './studentreviews.service';

describe('StudentreviewsService', () => {
  let service: StudentreviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentreviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
