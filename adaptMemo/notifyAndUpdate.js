import observableSubscriptionsCleanup from "../observableSubscriptionsCleanup.js";
import getCleanupNode from "../getCleanupNode.js";
import { effectContexts } from "../effectContexts.js";
import { queueCleanupUpdates } from "../cleanupUpdateFns.js";

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
  for (const cleanup of cleanupSet) {
    if (cleanup.type === "memo") {
      return cleanup;
    }
    cleanup();
  }
  cleanupSet.clear();

  effectContexts.push(memo);

  memo.value = fn();

  if (memo.firstRun) {
    memo.firstRun = false;
    cleanupSet.add(() => observableSubscriptionsCleanup(memo));
  } else {
    cleanupSet.add(memo);
    queueCleanupUpdates(() => {
      cleanupSet.clear();
      cleanupSet.add(() => observableSubscriptionsCleanup(memo));
    });
  }

  effectContexts.pop();

  const activeSubscriptions =
    memo.activeSubscriptions === "one" ? "two" : "one";

  memo.memoSubscriptions[activeSubscriptions].forEach((subscription) => {
    subscription.sendSignal("fresh");
  });

  memo.effectSubscriptions[activeSubscriptions].forEach((subscription) => {
    subscription.sendSignal("fresh");
  });
}
