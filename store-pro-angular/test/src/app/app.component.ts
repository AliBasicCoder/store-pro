import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BindStore } from 'store-pro-angular-test';
import { something } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  @BindStore(something, true) value?: number[];

  constructor(public changeDetector: ChangeDetectorRef) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  vl() {
    return JSON.stringify(this.value);
  }

  ch() {
    something.push(0);
  }
}
