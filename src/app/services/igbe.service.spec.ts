import { TestBed } from '@angular/core/testing';

import { IgbeService } from './igbe.service';

describe('IgbeService', () => {
  let service: IgbeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgbeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
