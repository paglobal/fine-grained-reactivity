const renderEffectArray1 = [];
const renderEffectArray2 = [];
let one = true;

export default function addRenderEffect(executeFn) {
  if (one) {
    renderEffectArray1.push(executeFn);

    if (renderEffectArray1.length === 1) {
      queueMicrotask(() => {
        one = false;
        renderEffectArray1.forEach((executeFn) => executeFn());
        renderEffectArray1.length = 0;
      });
    }
  } else {
    renderEffectArray2.push(executeFn);

    if (renderEffectArray2.length === 1) {
      queueMicrotask(() => {
        one = true;
        renderEffectArray2.forEach((executeFn) => executeFn());
        renderEffectArray2.length = 0;
      });
    }
  }
}
