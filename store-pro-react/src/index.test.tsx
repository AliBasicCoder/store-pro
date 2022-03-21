import { act, renderHook } from "@testing-library/react-hooks";
import { render } from "@testing-library/react";
import React from "react";
import { ReadableStore } from "store-pro-test";
import { storeOnClass, useStore } from "./index";
import "@testing-library/jest-dom";

class Something extends ReadableStore<number> {
  add(n: number) {
    this.update((c) => c + n);
  }
}

test("hook works", () => {
  const something = new Something(0);
  // @ts-ignore
  const s = renderHook(() => useStore(something));

  expect(s.result.current).toBe(0);
  act(() => something.add(2));
  expect(s.result.current).toBe(2);
});

class Something2 extends ReadableStore<number[]> {
  push(item: number) {
    this.update((val) => [...val, item]);
  }
  remove(index: number) {
    this.update((val) => {
      val.splice(index, 1);

      return val;
    });
  }
}

const something2 = new Something2([0, 1, 2]);

class TestComponent extends React.Component<any, { store: number[] }> {
  constructor(props: {}) {
    super(props);
    // @ts-ignore
    storeOnClass(this, something2);
  }
  render() {
    return JSON.stringify(this.state.store);
  }
}

test("storeOnClass works", () => {
  const h = render(<TestComponent />);
  expect(h.container.firstChild?.textContent).toBe(JSON.stringify([0, 1, 2]));
  act(() => something2.push(5));
  expect(h.container.firstChild?.textContent).toBe(
    JSON.stringify([0, 1, 2, 5])
  );
  act(() => something2.remove(1));
  expect(h.container.firstChild?.textContent).toBe(JSON.stringify([0, 2, 5]));
  act(() => something2.remove(0));
  expect(h.container.firstChild?.textContent).toBe(JSON.stringify([2, 5]));
});
