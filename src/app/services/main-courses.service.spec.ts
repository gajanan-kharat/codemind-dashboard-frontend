import { TestBed } from '@angular/core/testing';

import { MainCoursesService } from './main-courses.service';

describe('MainCoursesService', () => {
  let service: MainCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
