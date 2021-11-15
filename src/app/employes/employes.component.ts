import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { LocalDbService } from '../services/localDb.service';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { map } from 'lodash';
import { ConfirmationComponent } from '../services/confirmation/confirmation.component';

@Component({
  selector: 'app-employes',
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.scss']
})
export class EmployesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'action'];
  dataSource = new MatTableDataSource<any>([]);

  constructor(
    public dialog: MatDialog,
    private db: LocalDbService
  ) { }

  ngOnInit() {
    this.setEmployees();
  }

  setEmployees() {
    this.dataSource.data = map(this.db.getEmployees(), (el, idx) => ({i: idx + 1, name: el}));
  }

  onRemove(name: string): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: {
        msg: `Are you sure you want to remove the employee: ${name}`,
        btn: {
          text: 'Yes',
        },
        btn2: {
          text: 'No',
        }
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.db.removeEmployee(name);
      this.setEmployees();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '350px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: string | null) => {
      if (!result) { return; }
      this.db.addEmployee(result);
      this.setEmployees();
    });
  }

}
