import effectAndDescendantCleanup from "./effectAndDescendantCeanup.js";
import observableSubscriptionsCleanup from "./observableSubscriptionsCleanup.js";
import getCleanupNode from "./getCleanupNode.js";
import { effectContexts } from "../effectContexts.js";

export default function execute(effect, fn) {
  //to enable children effects to obtain correct positions upon recreation
  effect.childCount = 0;

  const cleanupSet = getCleanupNode(effect).get(0);
  cleanupSet.forEach((cleanup) => {
    cleanup();
  });
  cleanupSet.clear();

  effectContexts.push(effect);
  try {
    const fnReturnValue = fn();
    const returnValueCleanup = () => {
      if (typeof fnReturnValue === "function") {
        fnReturnValue();
      }
    };
    cleanupSet
      .add(returnValueCleanup)
      .add(() => observableSubscriptionsCleanup(effect));
  } finally {
    effectContexts.pop();
  }

  return () => effectAndDescendantCleanup(effect);
}
