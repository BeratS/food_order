/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalDbService } from './localDb.service';

describe('Service: LocalDb', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalDbService]
    });
  });

  it('should ...', inject([LocalDbService], (service: LocalDbService) => {
    expect(service).toBeTruthy();
  }));
});
