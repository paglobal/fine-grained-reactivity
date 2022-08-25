import adaptState from "./adaptState/adaptState.js";
import adaptRenderEffect from "./adaptEffect/adaptRenderEffect.js";
import adaptMemo from "./adaptMemo/adaptMemo.js";

const [count1, setcount1] = adaptState(1);
const [count2, setcount2] = adaptState(0);
const [count3, setcount3] = adaptState(0);
const [count4, setcount4] = adaptState(0);

adaptRenderEffect(
  (prevCount1 = 0) => {
    console.log("effect ran!", count1());
    console.log("effect ran!", prevCount1);

    prevCount1 = count1();
    return () => {
      console.log("cleanup ran!");
      return prevCount1;
    };
  },
  [count1]
);

//setcount1(count1() + 1);
//setcount1(count1() + 1);
//queueMicrotask(() => setcount1(count1() + 1));
//queueMicrotask(() => setcount1(count1() + 1));
//queueMicrotask(() => setcount1(count1() + 1));
//setTimeout(() => setcount1(count1() + 1));
//setTimeout(() => setcount1(count1() + 1));
//setTimeout(() => setcount1(count1() + 1));

//let product = () => {};
////const product = adaptMemo(() => count1() * count4());

//let cleanup = adaptSyncEffect(() => {
//adaptSyncEffect(() => {
////console.log("1st effect", "count1", count1());
////console.log("1st effect", "product", product());
////console.log("1st effect", "count4", count4());
//adaptSyncEffect(() => {
//console.log("2nd effect", count2());
//adaptSyncEffect(() => {
//console.log("3rd effect", count3());
//adaptSyncEffect(() => {
//console.log("4th effect", count4());

//let newCount = count4();
//return () => console.log("4th ReturnValue", newCount);
//});

//let newCount = count3();
//return () => console.log("3rd ReturnValue", newCount);
//});

//adaptSyncEffect(() => {
//console.log("3rd effect-1", count3());
//adaptSyncEffect(() => {
//console.log("4th effect-1", count4());

//let newCount = count4();
//return () => console.log("4th ReturnValue-1", newCount);
//});

//let newCount = count3();
//return () => console.log("3rd ReturnValue-1", newCount);
//});

//let newCount = count2();
//return () => console.log("2nd ReturnValue", newCount);
//});

////let newCount = count1();
////return () => console.log("1st ReturnValue", newCount);
//});

//product = adaptMemo(() => {
//console.log("Memo here!!");

//return count1() * count4();
//});

//console.log("Main effect", product());
//}, [count1]);

//const [count5, setcount5] = adaptState(0);

//adaptSyncEffect((count) => console.log(count), [count5]);

//console.log("1st");
//setcount3(count3() + 1);
//console.log("2nd");
//setcount2(count2() + 1);
//console.log("3rd");
//cleanup();
//console.log("4th");
//setcount2(count2() + 1);
//console.log("5th");
//setcount4(count4() + 1);
//cleanup();
//console.log("6th");
//setcount4(count4() + 1);
//console.log("7th");
//setcount1(count1() + 1);
//console.log("8th");
//setcount1(count1() + 1);
//console.log("9th");
//setcount5(count5() + 1);
//console.log("10th");
//setcount1(count1() + 1);
//console.log("11th");
//setcount1(count1() + 1);
