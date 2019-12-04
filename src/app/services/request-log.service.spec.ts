import { TestBed } from '@angular/core/testing';

import { RequestLogService } from './request-log.service';

describe('RequestLogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestLogService = TestBed.get(RequestLogService);
    expect(service).toBeTruthy();
  });
});
