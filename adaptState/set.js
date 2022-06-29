export default function set(state, nextValue) {
  // [...this.subscriptions].forEach((subscription) => {
  //   subscription.sendSignal("stale");
  // });

  // this.value = nextValue;

  // [...this.subscriptions].forEach((subscription) => {
  //   subscription.sendSignal("fresh");
  // });

  state.value = nextValue;

  [...state.subscriptions].forEach((subscription) => {
    subscription.execute();
  });
}
