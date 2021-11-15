import { ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfirmationComponent } from '../confirmation.component';
// Material Design Imports
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';

import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// NGX-TRANSLATOR
import {TranslateModule, TranslateService} from 'src/app/translate/translate';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/auth/services/user.service';
import { WSDataCommunication } from 'src/app/core/ws/ws-data-comm.service';
import { AlertService } from 'src/app/shared/alert/alert.service';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';

describe('ConfirmationComponent', () => {
  let component: ConfirmationComponent;
  let fixture: ComponentFixture<ConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, MaterialModule,
        NoopAnimationsModule, HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule
      ],
      declarations: [ ConfirmationComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        TranslateService,
        UserService,
        WSDataCommunication, AlertService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // https://github.com/angular/angular/issues/31834
  afterEach(() => {
    getTestBed().inject(ɵDomSharedStylesHost).ngOnDestroy();
  });

});
