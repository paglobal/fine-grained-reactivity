import { effectContexts } from "./effectContexts.js";

export default function setInitialParameters(effect) {
  const parentEffect = effectContexts[effectContexts.length - 1];
  if (parentEffect) {
    //use "position" and "level" to determine location of effect cleanup
    //in cleanup tree
    parentEffect.childCount++;
    effect.position = parentEffect.childCount;
    effect.level = parentEffect.level + 1;
    effect.cleanupTree = parentEffect.cleanupTree;
    effect.cleanupTreeNodePointer = [...parentEffect.cleanupTreeNodePointer];

    let effectCleanupTreeNodePointerLength =
      effect.cleanupTreeNodePointer.length;
    if (effectCleanupTreeNodePointerLength === effect.level) {
      effect.cleanupTreeNodePointer[effectCleanupTreeNodePointerLength - 1] =
        effect.position;
    } else if (effectCleanupTreeNodePointerLength < effect.level) {
      effect.cleanupTreeNodePointer[effectCleanupTreeNodePointerLength] =
        effect.position;
    } else if (effectCleanupTreeNodePointerLength > effect.level) {
      effect.cleanupTreeNodePointer.pop();
      effect.cleanupTreeNodePointer[effectCleanupTreeNodePointerLength - 2] =
        effect.position;
    }
  } else {
    effect.level = 1;
    effect.position = 1;
    effect.cleanupTreeNodePointer = [1];
    effect.cleanupTree = new Map();
  }
}
