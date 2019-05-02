import { Component } from '@angular/core';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  temp: number = 0;


  constructor() {
    this.setTemp();
  }

  setTemp() {
    this.temp = 42;
  }
}
