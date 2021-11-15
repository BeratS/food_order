import { TestBed, inject } from '@angular/core/testing';

import { AlertService } from './alert.service';

import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [AlertService]
    });
  });

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));

  it('should be called snackBar', inject([AlertService], (service: AlertService) => {
    spyOn(service, 'openSnackBar');
    service.openSnackBar('hello');
    expect(service.openSnackBar).toHaveBeenCalled();
  }));

});
