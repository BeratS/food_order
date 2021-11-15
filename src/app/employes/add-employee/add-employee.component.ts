import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {

  name = new FormControl('', [Validators.required, Validators.maxLength(150)]);

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>
  ) {}

  onSave() {
    this.dialogRef.close(this.name.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
