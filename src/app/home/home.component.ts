import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { compact, filter, findIndex, includes, map, reduce } from 'lodash';
import { take } from 'rxjs/operators';
import { ConfirmationComponent } from '../services/confirmation/confirmation.component';
import { LocalDbService } from '../services/localDb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('picker') picker!: MatDatepicker<any>;  

  displayedColumns: string[] = ['name', 'select', 'present'];
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);

  datePipe = new DatePipe('en-Us');

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  empLunchList: string[] = [];
  emplDayOff: string[] = [];

  constructor(
    public dialog: MatDialog,
    private db: LocalDbService
  ) { }

  ngOnInit() {
    this.fillTable();
    this.customSort();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  updateEmployeeList() {
    this.empLunchList = compact(map(this.db.getSavedEmployeeLunchForToday(), el => includes(this.emplDayOff, el) ? null : el));
  }

  fillTable(): void {
    this.emplDayOff = this.db.getDayOffEmployees();

    this.updateEmployeeList();
    const checkFirstStep = this.empLunchList.length > 0;

    // Fill table with employees -------------------------------------
    this.dataSource.data = map(
      this.db.getEmployees(), el => ({
        name: el,
        checked: this.emplDayOff.includes(el) ? false :
          checkFirstStep ? !this.empLunchList.includes(el) : true,
        isDayOff: this.emplDayOff.includes(el)
      }));

    // Select all employees ------------------------------------------
    this.selection.clear();
    this.selection.select(...filter(this.dataSource.data, 'checked'));

    // Prevent storing as we have already done this step
    if (checkFirstStep) {
      return;
    }

    // Save to db the all checked employees --------------------------
    this.db.saveEmployeeForLunch(this.getUnCheckedEmployesList(), false);
  }

  onSelectEmployee(row: any) {
    this.selection.toggle(row);
    this.db.saveEmployeeForLunch(this.getUnCheckedEmployesList());
    this.updateEmployeeList();
  }

  onSetEmployeeDayOff(name: string): void {
    this.picker.open();
    this.picker.closedStream.pipe(take(1)).subscribe({
      next: () =>  {
        const range = this.range.getRawValue();
        if (!range?.start) { return; }
        this.onConfirmDateRange(name, range);
      }
    });
  }

  onConfirmDateRange(name: string, range: { start: Date, end: Date }) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: {
        descHtml: `Are you sure you want to set a day off range from <b>${
          this.datePipe.transform(range.start, 'EEEE, MMMM d')
        }</b> to <b>${
          this.datePipe.transform(range.end, 'EEEE, MMMM d')
        }</b> for the employee: <b>${name}</b>`,
        btn: {text: 'Yes'}, btn2: {text: 'No'}
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.range.reset();
      if (!result) {
        return;
      }
      this.db.setEmployeeToDayOff({name, ...range });
      this.fillTable();
    });
  }

  backFromDayOff(name: string): void {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      width: '500px',
      maxWidth: '90vw',
      data: {
        msg: `Are you sure you want to get back to work`,
        btn: {text: 'Yes'}, btn2: {text: 'No' }
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.range.reset();
      if (!result) {
        return;
      }
      this.db.setEmployeeToDayOff({name}, true);
      this.db.saveEmployeeForLunch(compact(map(this.getUnCheckedEmployesList(), el => el !== name ? el : null)), false);
      this.fillTable();
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  customSort(): void {
    this.dataSource.sortingDataAccessor = (item: any, property) => {
      switch (property) {
        case 'name':
          return item?.name?.toLowerCase();
        case 'select':
          return item?.checked;
        case 'present':
          return item?.isDayOff;
        
        default:
          return '';
      }
    };
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  getUnCheckedEmployesList(): any[] {
    return reduce(this.dataSource.data, (result, value) => {
      const idx = findIndex(this.selection.selected, ['name', value.name]);
      if (idx < 0) {
        result.push(value.name);
      }
      return result;
    }, [] as string[]);
  }

}
