import "@testing-library/jest-dom";
import { act, render } from "@testing-library/svelte";
import Comp from "./Comp.svelte";
import { something } from "./store";

test("works", async () => {
  const h = render(Comp, {});

  expect(h.container.firstChild?.textContent).toBe(JSON.stringify([0, 1, 2]));
  await act(() => something.push(5));
  expect(h.container.firstChild?.textContent).toBe(
    JSON.stringify([0, 1, 2, 5])
  );
  await act(() => {
    something.remove(0);
    something.remove(1);
  });
  expect(h.container.firstChild?.textContent).toBe(JSON.stringify([1, 5]));
});
