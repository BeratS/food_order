import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployesComponent } from './employes/employes.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employees', component: EmployesComponent },
  { path: 'history', component: HistoryComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
