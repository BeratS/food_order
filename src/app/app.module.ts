import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { EmployesComponent } from './employes/employes.component';
import { HomeComponent } from './home/home.component';
import { AddEmployeeComponent } from './employes/add-employee/add-employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert/alert.service';
import { ConfirmationComponent } from './services/confirmation/confirmation.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [				
    AppComponent,
      EmployesComponent,
      HomeComponent,
      HistoryComponent,
      AddEmployeeComponent,
      ConfirmationComponent,
      HistoryComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    AlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
