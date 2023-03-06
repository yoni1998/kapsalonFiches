import { TestBed } from '@angular/core/testing';

import { FichesService } from './fiches.service';

describe('FichesService', () => {
  let service: FichesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
