export default function setCleanupSet(effect) {
  let cleanupSet = effect.cleanupTree;
  effect.cleanupTreeNodePointer.forEach((part) => {
    if (!cleanupSet.get(part)) {
      cleanupSet.set(part, new Map());
    }
    cleanupSet = cleanupSet.get(part);
  });
  if (!cleanupSet.get(0)) {
    cleanupSet.set(0, new Set());

    return false;
  }

  return true;
}
