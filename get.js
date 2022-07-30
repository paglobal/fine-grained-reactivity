import { effectContexts } from "./effectContexts.js";

function subscribe(state, effect) {
  const activeSubscriptions = state.activeSubscriptions;
  const type = effect.type;
  state[`${type}Subscriptions`][activeSubscriptions].add(effect);
  effect.observableSubscriptionSets.add(
    state[`${type}Subscriptions`][activeSubscriptions]
  );
}

export default function get(state) {
  const currentEffect = effectContexts[effectContexts.length - 1];
  if (currentEffect) {
    subscribe(state, currentEffect);
  }

  return state.value;
}
