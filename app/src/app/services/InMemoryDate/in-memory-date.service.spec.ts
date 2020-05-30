import { TestBed } from '@angular/core/testing';

import { InMemoryDateService } from './in-memory-date.service';

describe('InMemoryDateService', () => {
  let service: InMemoryDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemoryDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
