import { updateMemoCleanups } from "../cleanupUpdateFns.js";

export default function set(state, nextValue) {
  const activeSubscriptions = state.activeSubscriptions;
  state.activeSubscriptions = activeSubscriptions === "one" ? "two" : "one";

  state.memoSubscriptions[activeSubscriptions].forEach((subscription) => {
    subscription.sendSignal("stale");
  });

  state.effectSubscriptions[activeSubscriptions].forEach((subscription) => {
    subscription.sendSignal("stale");
  });

  state.value = nextValue;

  state.memoSubscriptions[activeSubscriptions].forEach((subscription) => {
    subscription.sendSignal("fresh");
  });

  state.effectSubscriptions[activeSubscriptions].forEach((subscription) => {
    subscription.sendSignal("fresh");
  });

  updateMemoCleanups();
}
