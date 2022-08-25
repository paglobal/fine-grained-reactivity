const asyncEffectAndCleanupArray1 = [];
const asyncEffectAndCleanupArray2 = [];
let one = true;

export default function addAsyncEffect(executeFn) {
  if (one) {
    asyncEffectAndCleanupArray1.push(executeFn);

    if (asyncEffectAndCleanupArray1.length === 1) {
      setTimeout(() => {
        one = false;
        asyncEffectAndCleanupArray1.forEach((executeFn) => executeFn());
        asyncEffectAndCleanupArray1.length = 0;
      });
    }
  } else {
    asyncEffectAndCleanupArray2.push(executeFn);

    if (asyncEffectAndCleanupArray2.length === 1) {
      setTimeout(() => {
        one = true;
        asyncEffectAndCleanupArray2.forEach((executeFn) => executeFn());
        asyncEffectAndCleanupArray2.length = 0;
      });
    }
  }
}
