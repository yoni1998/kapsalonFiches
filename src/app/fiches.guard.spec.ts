import { TestBed } from '@angular/core/testing';

import { FichesGuard } from './fiches.guard';

describe('FichesGuard', () => {
  let guard: FichesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(FichesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
