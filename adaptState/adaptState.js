import get from "./get.js";
import set from "./set.js";

export default function adaptState(initialValue) {
  const state = {
    subscriptions: new Set(),
    value: initialValue,
  };

  return [() => get(state), (nextValue) => set(state, nextValue)];
}
