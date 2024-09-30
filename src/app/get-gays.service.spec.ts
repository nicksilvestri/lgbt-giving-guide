import { TestBed } from '@angular/core/testing';

import { GetGaysService } from './get-gays.service';

describe('GetGaysService', () => {
  let service: GetGaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
