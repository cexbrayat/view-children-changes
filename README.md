# ViewChildrenChanges

This reproduces a difference in behavior between Ivy and VE.

The component is a simple `ngFor` and a `ViewChildren` query on the generated elements.
An `update` counter is updated every time the query's `changes` observable emits.

```typescript
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
```

A unit test checks it:

```typescript
it('should update 1 time', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const app = fixture.componentInstance;
  fixture.detectChanges();

  expect(app.updates).toBe(0);

  // update a user
  app.users[0] = { name: 'Jen' };
  fixture.detectChanges();

  expect(fixture.nativeElement.querySelector('div').textContent).toContain('Jen');
  expect(app.updates).toBe(1);
});
```

This tests runs fine in VE (`enableIvy: false` in `angular.json`), but fails with Ivy.
To repro:

```
npm i
ng test
# test succeeds
# switch enableIvy to true
ng test
# test fails with Expected 0 to be 1.
```

##UPDATE

The test must declare `DivDirective` in Ivy, and it was not necessary in VE.
