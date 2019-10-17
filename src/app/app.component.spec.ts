import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

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
});
