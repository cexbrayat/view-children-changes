import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  updates = 0;
  @ViewChildren('div') divs: QueryList<HTMLDivElement>;

  users = [
    { name: 'Bob' },
    { name: 'Alice' }
  ];

  ngAfterViewInit() {
    this.divs.changes.subscribe(_ => this.updates++);
  }
}
