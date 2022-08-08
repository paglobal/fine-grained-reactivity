import adaptState from "./adaptState/adaptState.js";
import adaptEffect from "./adaptEffect/adaptEffect.js";
import adaptMemo from "./adaptMemo/adaptMemo.js";

const [count1, setcount1] = adaptState(1);
const [count2, setcount2] = adaptState(0);
const [count3, setcount3] = adaptState(0);
const [count4, setcount4] = adaptState(0);

let product = () => {};
//const product = adaptMemo(() => count1() * count4());

let cleanup = adaptEffect(
  () => {
    adaptEffect(() => {
      //console.log("1st effect", "count1", count1());
      //console.log("1st effect", "product", product());
      //console.log("1st effect", "count4", count4());
      adaptEffect(() => {
        console.log("2nd effect", count2());
        adaptEffect(() => {
          console.log("3rd effect", count3());
          adaptEffect(() => {
            console.log("4th effect", count4());

            let newCount = count4();
            return () => console.log("4th ReturnValue", newCount);
          });

          let newCount = count3();
          return () => console.log("3rd ReturnValue", newCount);
        });

        adaptEffect(() => {
          console.log("3rd effect-1", count3());
          adaptEffect(() => {
            console.log("4th effect-1", count4());

            let newCount = count4();
            return () => console.log("4th ReturnValue-1", newCount);
          });

          let newCount = count3();
          return () => console.log("3rd ReturnValue-1", newCount);
        });

        let newCount = count2();
        return () => console.log("2nd ReturnValue", newCount);
      });

      //let newCount = count1();
      //return () => console.log("1st ReturnValue", newCount);
    });

    product = adaptMemo(() => {
      console.log("Memo here!!");

      return count1() * count4();
    });

    console.log("Main effect", product());
  },
  [count1],
  { defer: true }
);

//const [count5, setcount5] = adaptState(0);

//adaptEffect((count) => console.log(count), [count5]);

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
console.log("7th");
setcount1(count1() + 1);
console.log("8th");
setcount1(count1() + 1);
//console.log("9th");
//setcount5(count5() + 1);
//console.log("10th");
//setcount1(count1() + 1);
//console.log("11th");
//setcount1(count1() + 1);
