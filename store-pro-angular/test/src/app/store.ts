import { ReadableStore } from 'store-pro-test';

export class Something extends ReadableStore<number[]> {
  push(n: number) {
    console.log(n);
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

// const interval = setInterval(() => something.push(10), 1000);

// @ts-ignore
window.something = something;
// @ts-ignore
// window.interval = interval;
