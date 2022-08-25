import { updateMemoCleanups } from "../cleanupUpdateFns.js";
import { sendStaleSignals, sendFreshSignals } from "../sendSignals.js";

export default function set(state, nextValue) {
  const activeSubscriptions = state.activeSubscriptions;
  state.activeSubscriptions = activeSubscriptions === "one" ? "two" : "one";

  sendStaleSignals(state, activeSubscriptions);

  state.value = nextValue;

  sendFreshSignals(state, activeSubscriptions);

  updateMemoCleanups();
}
