let test = [
  { socketId: "jioe3mfg", color: "#F94144", name: "ㄱㄱ", id: 0 },
  { socketId: "xedfx3kt", color: "#F8961E", name: "ㄴㄴ", id: 2 },
  { socketId: "d3shej20", color: "#F9844A", name: "ㄷㄷ", id: 3 },
];

let normal = "jioe3mfg";

let idx;

for (let i = 0; i < test.length; i++) {
  if (test[i].socketId === normal) {
    idx = i;
  }
}

test.splice(idx, 1);

console.log(test);
