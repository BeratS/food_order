import { Injectable } from '@angular/core';
import { compact, findIndex, indexOf, map, trim } from 'lodash';
import { AlertService } from './alert/alert.service';

const dbKey = {
  Employee: 'EMPLOYEES',
  History: 'HISTORY',
  Vacation: 'VACATION'
}

@Injectable({
  providedIn: 'root'
})
export class LocalDbService {

  constructor(
    private alert: AlertService
  ) { }

  // Registering employees ---------------------------------------------------

  getEmployees(): string[] {
    try {
      const ls = localStorage.getItem(dbKey.Employee);
      return ls ? JSON.parse(ls) : [];
    } catch (e) {
      return [];
    }
  }

  addEmployee(name: string) {
    try {
      let empl = this.getEmployees();
      const trimName = trim(name);
      if (empl.includes(trimName)) {
        this.alert.openSnackBar('The employee already exists');
        return;
      }
      empl.push(trimName);
      localStorage.setItem(dbKey.Employee, JSON.stringify(empl));
      this.alert.openSnackBar(`You added new employee ${name}`, true);
    } catch (e) {
      console.error(`Error: Unable to store Employee ${name}`);
    }
  }


  removeEmployee(name: string): void {
    try {
      let empl = this.getEmployees();
      const idx = indexOf(empl, name);
      if (idx < 0) {
        this.alert.openSnackBar('The employee does not exists');
        return;
      }
      empl.splice(idx, 1)
      localStorage.setItem(dbKey.Employee, JSON.stringify(empl));
      this.alert.openSnackBar(`You successfully remove employee ${name}`, true);
    } catch (e) {
      console.error(`Error: Unable to remove Employee ${name}`);
    }
  }

  // Save employee lunch -----------------------------------------
  getSavedEmployeeLunchForToday(): any {
    const empLunchList = this.getSavedEmployeeLunch();
    return empLunchList[this.getTodayDate] ?? [];
  }

  getSavedEmployeeLunch(): any {
    try {
      const ls = localStorage.getItem(dbKey.History);
      return ls ? JSON.parse(ls) : {};
    } catch (e) {
      return [];
    }
  }

  saveEmployeeForLunch(employees: string[], showAlert = true): void {
    try {
      let data = this.getSavedEmployeeLunch();

      data[this.getTodayDate] = employees;
      
      localStorage.setItem(dbKey.History, JSON.stringify(data));
      if (!showAlert) { return; }
      this.alert.openSnackBar(`You successfully update the lunch list`, true);
    } catch (e) {
      console.error(`Error: Unable to store the employee lunch selection`);
    }
  }

  get getTodayDate() {
    const dt = new Date();
    dt.setHours(0, 0, 0, 0);
    return dt.getTime();
  }

  // Add employees to day off --------------------------------------------------

  getDayOffEmployees(): string[] {
    const list = this.getDayOffEmployeesList();
    const result: any[] = [];

    const today = this.getTodayDate;
    const final = compact(map(list, el => {
      const start = new Date(el.start).getTime();
      const end = new Date(el.end).getTime();

      if (start <= today && end >= today) {
        result.push(el);
        return  el?.name;
      }
      return null;
    }));

    // Re-Update the list of expired dayoff
    localStorage.setItem(dbKey.Vacation, JSON.stringify(result));
    return final;
  }

  getDayOffEmployeesList(): any {
    try {
      const ls = localStorage.getItem(dbKey.Vacation);
      return ls ? JSON.parse(ls) : [];
    } catch (e) {
      return [];
    }
  }

  setEmployeeToDayOff(employee: {name: string, start?: Date; end?: Date; }, isDelete?: boolean): void {
    try {
      const data = this.getDayOffEmployeesList();
      if (isDelete) {
        const findIdx = findIndex(data, ['name', employee.name])
        if (findIdx >= 0) {
          data.splice(findIdx, 1);
        }
      } else {
        data.push(employee);
      }
      
      localStorage.setItem(dbKey.Vacation, JSON.stringify(data));
      this.alert.openSnackBar(`You successfully ${
        isDelete ? 'updated' : 'added'} the employee to list`, true);
    } catch (e) {
      console.error(`Error: Unable to store the employee lunch selection`);
    }
  }

}

