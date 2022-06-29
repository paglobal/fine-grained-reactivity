import { effectContexts } from "../effectContexts.js";

function subscribe(state, effect) {
  state.subscriptions.add(effect);
  effect.observableSubscriptionSets.add(state.subscriptions);
}

export default function get(state) {
  const currentEffect = effectContexts[effectContexts.length - 1];
  if (currentEffect) {
    subscribe(state, currentEffect);
  }

  return state.value;
}
