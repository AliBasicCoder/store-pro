import { ReadableStore, WritableStore } from "./index";

class TimePassed extends ReadableStore<number> {
  constructor() {
    super(0);
  }
  countFor(s: number) {
    const interval = setInterval(() => {
      this.update((time) => time + 1);
    }, 1000);

    setTimeout(() => clearInterval(interval), s * 1000);
  }
}

class Count extends WritableStore<number> {
  constructor() {
    super(0);
  }
}

class Something extends ReadableStore<number> {
  constructor() {
    super(0);
    this.onSubscribe = () => {
      const interval = setInterval(() => this.update((val) => val + 1), 1000);
      this.onUnsubscribe = () => {
        clearInterval(interval);
      };
    };
  }
}

test("ReadableStore Subscription", (done) => {
  const calls: number[] = [];
  const timePassed = new TimePassed();
  timePassed.subscribe((val) => calls.push(val));
  timePassed.countFor(3);
  setTimeout(() => {
    expect(calls).toEqual([0, 1, 2]);
    done();
  }, 3010);
});

test("ReadableStore Unsubscribes", (done) => {
  const calls: number[] = [];
  const timePassed = new TimePassed();
  const unsubscribe = timePassed.subscribe((val) => calls.push(val));
  timePassed.countFor(4);
  setTimeout(unsubscribe, 2090);
  setTimeout(() => {
    expect(calls).toEqual([0, 1, 2]);
    done();
  }, 4010);
});

test("WritableStore", () => {
  const calls: number[] = [];
  const count = new Count();
  const unsubscribe = count.subscribe((val) => calls.push(val));
  count.set(1);
  count.update((n) => n + 1);
  unsubscribe();
  expect(calls).toEqual([0, 1, 2]);
});

test("OnSubscribe OnUnsubscribe", (done) => {
  const something = new Something();
  const calls: number[] = [];
  let unsubscribe = something.subscribe((val) => calls.push(val));
  setTimeout(() => {
    unsubscribe();
    expect(calls).toEqual([0, 1, 2]);
  }, 2010);
  setTimeout(() => {
    expect(calls).toEqual([0, 1, 2]);
    unsubscribe = something.subscribe((val) => calls.push(val));
  }, 3010);
  setTimeout(() => {
    unsubscribe();
    expect(calls).toEqual([0, 1, 2, 2, 3]);
    done();
  }, 4020);
});
