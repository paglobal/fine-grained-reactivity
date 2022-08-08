import effectAndDescendantCleanup from "./effectAndDescendantCeanup.js";
import observableSubscriptionsCleanup from "../observableSubscriptionsCleanup.js";
import getCleanupNode from "../getCleanupNode.js";
import { effectContexts } from "../effectContexts.js";

function implicitDependencyExecuteFn(effect, fn) {
  //to enable children effects to obtain correct positions upon recreation
  effect.childCount = 0;

  const cleanupSet = getCleanupNode(effect).get(0);
  cleanupSet.forEach((cleanup) => {
    cleanup();
  });
  cleanupSet.clear();

  effectContexts.push(effect);

  const fnReturnValue = fn();
  const returnValueCleanup = () => {
    if (typeof fnReturnValue === "function") {
      fnReturnValue();
    }
  };
  cleanupSet
    .add(returnValueCleanup)
    .add(() => observableSubscriptionsCleanup(effect));

  effectContexts.pop();

  return () => effectAndDescendantCleanup(effect);
}

function dependencyArrayExecuteFn(effect, fn, depArray, options) {
  //to enable children effects to obtain correct positions upon recreation
  effect.childCount = 0;

  const cleanupSet = getCleanupNode(effect).get(0);
  cleanupSet.forEach((cleanup) => {
    cleanup();
  });
  cleanupSet.clear();

  effectContexts.push(effect);

  effect.tracking = "implicit";
  const argsArray = depArray.map((state) => state());
  effect.tracking = "depArray";

  if (effect.firstRun && options?.defer) {
    effect.firstRun = false;
  } else {
    const fnReturnValue = fn(argsArray);
    const returnValueCleanup = () => {
      if (typeof fnReturnValue === "function") {
        fnReturnValue();
      }
    };
    cleanupSet.add(returnValueCleanup);
  }
  cleanupSet.add(() => observableSubscriptionsCleanup(effect));

  effectContexts.pop();

  return () => effectAndDescendantCleanup(effect);
}

const executeFns = {
  implicit: implicitDependencyExecuteFn,
  depArray: dependencyArrayExecuteFn,
};

export default executeFns;
