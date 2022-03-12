import { ReadableStore } from "store-pro-test";

class Something extends ReadableStore<number[]> {
  push(n: number) {
    this.update((arr) => [...arr, n]);
  }
  remove(index: number) {
    this.update((arr) => {
      arr.splice(index, 1);
      return arr;
    });
  }
}

export const something = new Something([0, 1, 2]);
