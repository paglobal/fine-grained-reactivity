import getCleanupNode from "../getCleanupNode.js";

function traverseAndEvaluate(cleanupNode) {
  let nextChildNode = 0;
  while (cleanupNode.get(nextChildNode)) {
    if (nextChildNode === 0) {
      const cleanupSet = cleanupNode.get(0);
      cleanupSet.forEach((cleanup) => {
        cleanup();
      });
      cleanupSet.clear();
    } else {
      const nextCleanupNode = cleanupNode.get(nextChildNode);
      traverseAndEvaluate(nextCleanupNode);
    }

    nextChildNode++;
  }
}

export default function effectAndDescendantCleanup(effect) {
  const cleanupNode = getCleanupNode(effect);
  traverseAndEvaluate(cleanupNode);
}
