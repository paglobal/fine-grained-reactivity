import sendSignal from "./sendSignal.js";
import get from "../get.js";
import setInitialParameters from "../setInitialParameters.js";
import setCleanupSet from "../setCleanupSet.js";
import { updateValueAndSendFreshNotifications } from "./notifyAndUpdate.js";

export default function adaptMemo(fn) {
  const memo = {
    //state properties
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
    value: null,
    //effect properties
    firstRun: true,
    type: "memo",
    childCount: 0,
    position: null,
    level: null,
    cleanupTree: null,
    cleanupTreeNodePointer: null,
    observableSubscriptionSets: new Set(),
    staleStateValuesCount: 0,
    sendSignal: (signal) => sendSignal(memo, fn, signal),
  };

  setInitialParameters(memo);
  setCleanupSet(memo);
  const cleanupMemo = updateValueAndSendFreshNotifications(memo, fn);

  return cleanupMemo ? () => get(cleanupMemo) : () => get(memo);
}
