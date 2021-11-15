import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

// Material sources
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { has, isString } from 'lodash';
import { Subscription } from 'rxjs';
import { ICFormType } from './models/config';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent implements OnInit {
  private subc$!: Subscription;
  hmiView = false;

  formType = ICFormType;

  input = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<ConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      if (
        has(this.data, 'data') &&
        has(this.data.data, 'hmi') &&
        this.data.data.hmi
      ) {
        this.hmiView = true;
      }
    }

  ngOnInit(): void {
    if (has(this.data, 'form')) {
      const formData = this.data.form;

      switch (formData?.type) {
        case this.formType.RADIO:
          this.input = new FormControl(formData?.value);
          break;

        case this.formType.CHECKBOX:
          this.input = new FormControl(formData?.value);
          break;

        default:
          this.input = new FormControl('', formData.validator);
          break;
      }
    }
  }

  onSave(): void {
    const data = this.data;
    if (has(this.data, 'form')) {
      if (this.input.invalid) {
        return;
      }
      data.value = this.input?.value;
    }

    this.subc$?.unsubscribe();
    this.dialogRef?.close(data);
  }

  onNoClick(): void {
    this.dialogRef?.close();
  }

  getBtnWord(isClass: boolean): string {
    return this.data?.btn ?
      isString(this.data.btn) ?
        this.data?.btn || '' :
        isClass ?
          this.data.btn?.class :
          this.data.btn?.text :
      'Save';
  }

  getBtn2Word(isClass: boolean): string {
    return this.data?.btn2 ?
      isString(this.data.btn2) ?
        this.data.btn2 :
        isClass ?
          this.data.btn2?.class :
          this.data.btn2?.text :
      'Cancel';
  }

  onCheckboxChange(idx: number, event: any): void {
    const formValue = this.input.value;
    formValue[idx] = Number(event);
    this.input.patchValue(formValue);
  }

}
