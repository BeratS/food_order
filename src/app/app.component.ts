import { Component } from '@angular/core';
import { LocalDbService } from './services/localDb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // viber bot token =  4e4396d83027e4f3-7a5767d40b16c20f-1965d33bf787a756

  title = 'ved-lunch';

  constructor(
    private db: LocalDbService
  ) {}

  get time() {
    return this.db.dateTime;
  }

}
