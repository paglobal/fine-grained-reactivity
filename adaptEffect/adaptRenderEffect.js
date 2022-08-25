import executeFns from "./executeFns.js";
import sendSignal from "./sendSignal.js";
import setInitialParameters from "../setInitialParameters.js";
import setCleanupSet from "../setCleanupSet.js";

export default function adaptRenderEffect(fn, depArray, options) {
  const tracking = typeof depArray === "undefined" ? "implicit" : "depArray";
  const execute = executeFns[tracking];

  const effect = {
    firstRun: true,
    type: "render",
    tracking,
    childCount: 0,
    position: null,
    level: null,
    cleanupTree: null,
    cleanupTreeNodePointer: null,
    observableSubscriptionSets: new Set(),
    staleStateValuesCount: 0,
    sendSignal: (signal) => sendSignal(effect, execute, fn, depArray, signal),
  };

  setInitialParameters(effect);
  setCleanupSet(effect);

  queueMicrotask(() => execute(effect, fn, depArray, options));
}
