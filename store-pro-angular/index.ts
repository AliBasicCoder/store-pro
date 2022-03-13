import { Store } from "store-pro-test";
import { OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";

function BindStore<T>(
  store: T,
  useChangeDetector: true
): (
  target: { [key: string]: any } & OnInit &
    OnDestroy & { changeDetector: ChangeDetectorRef },
  propertyName: string
) => void;
function BindStore<T>(
  store: T,
  useChangeDetector: false
): (
  target: { [key: string]: any } & OnInit & OnDestroy,
  propertyName: string
) => void;
function BindStore<T>(
  store: Store<T>,
  useChangeDetector = false
): (
  target: { [key: string]: any } & OnInit &
    OnDestroy & { changeDetector?: ChangeDetectorRef },
  propertyName: string
) => void {
  return function (target, propertyName) {
    let ngOnInit = target.ngOnInit;
    let ngOnDestroy = target.ngOnDestroy;

    let unsubscribe = () => {};

    target.ngOnInit = function () {
      unsubscribe = store.subscribe((val) => {
        this[propertyName] = val;
        if (useChangeDetector) this.changeDetector?.detectChanges();
      });

      ngOnInit.call(this);
    };

    target.ngOnDestroy = function () {
      unsubscribe();

      ngOnDestroy.call(this);
    };
  };
}

export { BindStore };
