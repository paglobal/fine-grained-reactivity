import sendSignal from "./sendSignal.js";
import get from "../get.js";
import setInitialParameters from "../setInitialParameters.js";
import setCleanupSet from "../setCleanupSet.js";
import { updateValueAndSendFreshNotifications } from "./notifyAndUpdate.js";

export default function adaptMemo(fn) {
  const memo = {
    //state properties
    effectSubscriptions: {
      one: new Set(),
      two: new Set(),
    },
    memoSubscriptions: {
      one: new Set(),
      two: new Set(),
    },
    activeSubscriptions: "one",
    value: null,
    //effect properties
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
  updateValueAndSendFreshNotifications(memo, fn);

  return () => get(memo);
}
