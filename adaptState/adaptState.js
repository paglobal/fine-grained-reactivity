import get from "../get.js";
import set from "./set.js";

export default function adaptState(initialValue) {
  const state = {
    syncSubscriptions: {
      one: new Set(),
      two: new Set(),
    },
    memoSubscriptions: {
      one: new Set(),
      two: new Set(),
    },
    asyncAndRenderSubscriptions: new Set(),
    activeSubscriptions: "one",
    value: initialValue,
  };

  return [() => get(state), (nextValue) => set(state, nextValue)];
}
