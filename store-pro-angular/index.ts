import { Store } from "store-pro-test";
import { OnInit, OnDestroy } from "@angular/core";

export function BindStore<T>(store: Store<T>) {
  return function (
    target: { [key: string]: any } & OnInit & OnDestroy,
    propertyName: string
  ) {
    let ngOnInit = target.ngOnInit;
    let ngOnDestroy = target.ngOnDestroy;

    let unsubscribe = () => {};

    target.ngOnInit = function () {
      unsubscribe = store.subscribe((val) => {
        this[propertyName] = val;
      });

      ngOnInit.call(this);
    };

    target.ngOnDestroy = function () {
      unsubscribe();

      ngOnDestroy.call(this);
    };
  };
}
