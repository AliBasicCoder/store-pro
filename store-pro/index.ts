export class Store<T> {
  private subscribers: { [key: string]: (val: T) => T } = {};
  private count = 0;
  /** gets called when the first subscriber subscribes */
  protected onSubscribe = () => {};
  /** gets called when the last subscriber unsubscribes */
  protected onUnsubscribe = () => {};

  constructor(private value: T) {}

  /** subscribe to the store */
  subscribe(subscriber: (val: T) => any) {
    this.count++;
    const id = this.count;
    if (Object.values(this.subscribers).length === 0) {
      this.onSubscribe();
    }
    this.subscribers[id] = subscriber;
    this.subscribers[id](this.value);
    return () => {
      delete this.subscribers[id];
      if (Object.values(this.subscribers).length === 0) {
        this.onUnsubscribe();
      }
    };
  }

  protected set_(newVal: T) {
    this.value = newVal;
    for (const id in this.subscribers) {
      this.subscribers[id](this.value);
    }
  }

  protected update_(fn: (val: T) => T) {
    this.set_(fn(this.value));
  }

  /** get the value of the store */
  get() {
    return this.value;
  }
}

/** a Store that can be modified from anywhere */
export class WritableStore<T> extends Store<T> {
  public set = this.set_;
  public update = this.update_;
}

/** a Store that can be modified from inside the class Only */
export class ReadableStore<T> extends Store<T> {
  protected set = this.set_;
  protected update = this.update_;
}
