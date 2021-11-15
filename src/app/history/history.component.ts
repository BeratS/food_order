import { Component, OnInit } from '@angular/core';
import { compact, map } from 'lodash';
import { LocalDbService } from '../services/localDb.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  data: {dt: number, names: string[]}[] = [];

  constructor(
    private db: LocalDbService
  ) { }

  ngOnInit() {
    this.data = compact(map(this.db.getSavedEmployeeLunch(),
      (el: string[], k: number) => {
        return !el.length ? null : {dt: k, names: el}
      }));
  }

}
