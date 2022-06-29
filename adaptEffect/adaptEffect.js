import execute from "./execute.js";
import setInitialParameters from "./setupInitialParameters.js";
import setCleanupSet from "./setupCleanupSet.js";

export default function adaptEffect(fn) {
  const effect = {
    childCount: 0,
    position: null,
    level: null,
    cleanupTree: null,
    cleanupTreeNodePointer: null,
    observableSubscriptionSets: new Set(),
    staleStateValuesCount: 0,
    execute: () => execute(effect, fn),
  };

  setInitialParameters(effect);
  setCleanupSet(effect);

  return execute(effect, fn);
}
