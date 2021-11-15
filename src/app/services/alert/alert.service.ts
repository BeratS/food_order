import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, style = false, duration = 3000, action?: string) {
    this.snackBar.open(message, action, {
        duration: duration,
        panelClass: style ? ['alert-success'] : ['alert-danger'],
        verticalPosition: 'top'
    });
  }

}
