import { ReadableStore } from 'store-pro-test';

export class Something extends ReadableStore<number[]> {
  push(n: number) {
    this.update((val) => [...val, n]);
  }
  remove(index: number) {
    this.update((val) => {
      val.splice(index, 1);

      return val;
    });
  }
}

export const something = new Something([]);
