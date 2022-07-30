let arr = [],
  set = new Set(),
  obj = {};
let n = 10000000;

// test 1**********
console.time("set");
for (let i = 0; i < n; i++) {
  // set.add(Math.floor(Math.random() * 20));
  set.add(i);
}
console.timeEnd("set");
// console.log(set);

console.time("arr");
for (let i = 0; i < n; i++) {
  // arr.push(Math.floor(Math.random() * 20));
  arr.push(i);
}
console.timeEnd("arr");
// console.log(arr);

// test 2**********
console.time("set");
set.forEach((el) => {
  let n = 100;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
});
set.forEach((el) => {
  let n = 100;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
});
console.timeEnd("set");

console.time("arr");
arr.forEach((el) => {
  let n = 100;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
});
arr.forEach((el) => {
  let n = 100;
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
});
console.timeEnd("arr");
