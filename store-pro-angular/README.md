# store-pro-angular

[store-pro](https://npmjs.com/package/store-pro)'s angular implantation

> store-pro allows you to manage state in angular easily

# example

## create the store

```ts
// store.ts
import { ReadableStore } from "store-pro"

export interface Todo {
  title: string;
  done: boolean;
  id: number
}

// if you want update and set methods to be accessed outside
// the use "WritableStore" instead
class TodoStore extends ReadableStore<Todo[]> {
  addTodo(todo: Todo) {
    this.update(state => {
      // you don't need to create a new object every update
      state.push(todo);
      return state;
      // or...
      return [...state, todo];
    })
  }
  removeTodo(id: number) {
    this.update(state => state.filter(todo => todo.id !== id);
  }
}

export const todoStore = new TodoStore([]);
```

notice: you don't have to create dispatcher, actions, reducers or any of that stuff

## use the store

in angular you could use the `BindStore` property decorator

as in the example bellow

```ts
// app.component.ts
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { BindStore } from "store-pro-angular";
import { todoStore, Todo } from "./store";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  @BindStore(todoStore, true) $todos?: Todo[];

  // NOTE: technically you don't have to set this
  // changeDetector property, but angular will only react
  // to changes if an event is dispatched
  // (mouse event, keyboard event, rxjs store update, ...etc)
  // if this is ok with you please this "changeDetector" property
  // and remove the true in BindStore above
  // NOTE2: store-pro requires this property to be named
  // "changeDetector" and nothing else
  constructor(public changeDetector: ChangeDetectorRef) {}

  ngOnDestroy(): void {}

  ngOnInit(): void {}

  removeTodo(id: number) {
    todoStore.removeTodo(id);
  }
}
```

```html
<!-- app.component.html --->
<div class="todo" *ngFor="let todo of $todos">
  <h1>{{ todo.title }}</h1>
  <button (click)="removeTodo(todo.id)"></button>
</div>
```

# License

MIT AliBasicCoder 2022 (c)
