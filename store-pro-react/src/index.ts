import React, { useEffect, useState } from "react";
import { Store } from "./store-pro";

export function useStore<T>(store: Store<T>) {
  const [$store, set$store] = useState(store.get());
  const setDumb = useState(0)[1];
  let dumb = 0;

  useEffect(() => {
    const unsubscribe = store.subscribe((val) => {
      set$store(val);
      dumb++;
      // this forces react to re-render
      // cause react doesn't render without copying val like { ...val }
      setDumb(dumb);
    });

    return unsubscribe;
  }, []);

  return $store;
}

export function storeOnClass<T>(
  cl: React.Component,
  store: Store<T>,
  key: string = "store"
) {
  // @ts-ignore
  if (key) {
    cl.state = {};
    // @ts-ignore
    cl.state[key] = store.get();
  } else cl.state = store.get();
  const d = cl.componentDidMount;
  const u = cl.componentWillUnmount;
  cl.componentDidMount = () => {
    // @ts-ignore
    cl.unsubscriber = key
      ? store.subscribe((val) =>
          cl.setState((prevState) => ({ ...prevState, [key]: val }))
        )
      : store.subscribe((val) => cl.setState(val));
    d?.call(cl);
  };
  cl.componentWillUnmount = () => {
    // @ts-ignore
    cl.unsubscriber();
    u?.call(cl);
  };
}
