import { Component, Directive, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

@Directive({ selector: 'div' })
export class DivDirective {
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  updates = 0;
  @ViewChildren(DivDirective) divs: QueryList<HTMLDivElement>;

  users = [
    { name: 'Bob' },
    { name: 'Alice' }
  ];

  ngAfterViewInit() {
    this.divs.changes.subscribe(_ => this.updates++);
  }
}
