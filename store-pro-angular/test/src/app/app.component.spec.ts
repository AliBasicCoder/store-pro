import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { something } from './store';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('works', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    app.ngOnInit();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.firstChild?.textContent).toBe('[]');
    expect(app.value).toEqual([]);
    something.push(10);
    something.push(2);
    expect(element.firstChild?.textContent).toBe('[10,2]');
    expect(app.value).toEqual([10, 2]);
    something.remove(0);
    expect(element.firstChild?.textContent).toBe('[2]');
    expect(app.value).toEqual([2]);
  });

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'test'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('test');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('test app is running!');
  // });
});
