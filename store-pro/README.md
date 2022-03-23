# store-pro

> store-pro allows you to handle state easily across multiple js frameworks (namely react, angular & svelte)

vue support coming soon

# example

## create the store

```ts
// store.ts
import { ReadableStore } from "store-pro";

export interface Todo {
  title: string;
  done: boolean;
  id: number;
}

// if you want update and set methods to be accessed outside
// the use "WritableStore" instead
class TodoStore extends ReadableStore<Todo[]> {
  addTodo(todo: Todo) {
    this.update((state) => {
      // you don't need to create a new object every update
      state.push(todo);
      return state;
      // or...
      return [...state, todo];
    });
  }
  removeTodo(id: number) {
    this.update((state) => state.filter((todo) => todo.id !== id));
  }
}

export const todoStore = new TodoStore([]);
```

notice: you don't have to create dispatcher, actions, reducers or any of that stuff

## use the store (React)

to use any store-pro store use the `useStore` method from [store-pro-react](https://npmjs.com/package/store-pro-react)

```tsx
import { useStore } from "store-pro-react";
import { todoStore, Todo } from "./store";

export function App() {
  // no need to infer the type it's here for explaining
  const $todos: Todo[] = useStore(todoStore);

  return (
    <>
      {$todos.map((todo) => (
        <>
          <h1>{todo.title}</h1>
          <button onClick={() => todoStore.removeTodo(todo.id)}>
            remove todo
          </button>
        </>
      ))}
    </>
  );
}
```

## use the store (Angular)

in angular you could use the `BindStore` property decorator
from [store-pro-angular](https://npmjs.com/package/store-pro-angular)

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

## use the store (svelte)

in svelte you can use store-pro stores as if they're a normal

svelte store

```html
<!-- doesn't need to be ts to work --->
<script lang="ts">
  import { todoStore, Todo } from "./store";
</script>

<!-- your logic --->

<!-- you can use the store as any svelte store --->
<h1>{$todoStore[0].title}</h1>
```

# License

MIT AliBasicCoder 2022 (c)
