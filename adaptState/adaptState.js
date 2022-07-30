import get from "../get.js";
import set from "./set.js";

export default function adaptState(initialValue) {
  const state = {
    effectSubscriptions: {
      one: new Set(),
      two: new Set(),
    },
    memoSubscriptions: {
      one: new Set(),
      two: new Set(),
    },
    activeSubscriptions: "one",
    value: initialValue,
  };

  return [() => get(state), (nextValue) => set(state, nextValue)];
}
