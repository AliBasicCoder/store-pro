# store-pro-react

[store-pro](https://npmjs.com/package/store-pro)'s react implantation

> store-pro allows you to manage state in react easily

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
          <button onClick={todoStore.removeTodo(todo.id)}>remove todo</button>
        </>
      ))}
    </>
  );
}
```

# License

MIT AliBasicCoder 2022 (c)
