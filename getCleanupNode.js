export default function getCleanupNode(effect) {
  let cleanupNode = effect.cleanupTree;
  effect.cleanupTreeNodePointer.forEach((part) => {
    cleanupNode = cleanupNode.get(part);
  });

  return cleanupNode;
}
