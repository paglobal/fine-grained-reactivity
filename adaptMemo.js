import adaptState from "./adaptState/adaptState.js";
import adaptEffect from "./adaptEffect/adaptEffect.js";

export default function adaptMemo(fn) {
  const [get, set] = adaptState();
  adaptEffect(() => set(fn()));

  return get;
}
