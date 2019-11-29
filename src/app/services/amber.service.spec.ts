import { TestBed } from '@angular/core/testing';

import { AmberService } from './amber.service';

describe('AmberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AmberService = TestBed.get(AmberService);
    expect(service).toBeTruthy();
  });
});
