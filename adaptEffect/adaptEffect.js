import execute from "./execute.js";
import sendSignal from "./sendSignal.js";
import setInitialParameters from "../setInitialParameters.js";
import setCleanupSet from "../setCleanupSet.js";

export default function adaptEffect(fn) {
  const effect = {
    type: "effect",
    childCount: 0,
    position: null,
    level: null,
    cleanupTree: null,
    cleanupTreeNodePointer: null,
    observableSubscriptionSets: new Set(),
    staleStateValuesCount: 0,
    sendSignal: (signal) => sendSignal(effect, fn, signal),
  };

  setInitialParameters(effect);
  setCleanupSet(effect);

  return execute(effect, fn);
}
