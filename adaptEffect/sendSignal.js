export default function sendSignal(effect, execute, fn, depArray, signal) {
  if (signal === "stale") {
    effect.staleStateValuesCount++;
  } else if (signal === "fresh") {
    effect.staleStateValuesCount--;
    if (effect.staleStateValuesCount <= 0) {
      //to make sure "effect.stateStateValuesCount" doesn't go beyond zero
      effect.staleStateValuesCount = 0;
      execute(effect, fn, depArray);
    }
  }
}
