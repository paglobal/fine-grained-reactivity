import observableSubscriptionsCleanup from "../observableSubscriptionsCleanup.js";
import getCleanupNode from "../getCleanupNode.js";
import { effectContexts } from "../effectContexts.js";

export function sendStaleNotifications(memo) {
  const activeSubscriptions = memo.activeSubscriptions;
  memo.activeSubscriptions = activeSubscriptions === "one" ? "two" : "one";

  memo.memoSubscriptions[activeSubscriptions].forEach((subscription) => {
    subscription.sendSignal("stale");
  });

  memo.effectSubscriptions[activeSubscriptions].forEach((subscription) => {
    subscription.sendSignal("stale");
  });
}

export function updateValueAndSendFreshNotifications(memo, fn) {
  //to enable children effects to obtain correct positions upon recreation
  memo.childCount = 0;

  const cleanupSet = getCleanupNode(memo).get(0);
  cleanupSet.forEach((cleanup) => {
    cleanup();
  });
  cleanupSet.clear();

  effectContexts.push(memo);
  try {
    memo.value = fn();
    cleanupSet.add(() => observableSubscriptionsCleanup(memo));
  } finally {
    effectContexts.pop();
  }

  const activeSubscriptions =
    memo.activeSubscriptions === "one" ? "two" : "one";

  memo.memoSubscriptions[activeSubscriptions].forEach((subscription) => {
    console.log("Here");
    subscription.sendSignal("fresh");
  });

  memo.effectSubscriptions[activeSubscriptions].forEach((subscription) => {
    console.log("Here");
    subscription.sendSignal("fresh");
  });
}
