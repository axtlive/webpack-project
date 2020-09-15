// module.exports = "come on fuck me";

require("@babel/polyfill");

function* gen(para) {
  yield 1;
}

console.log(gen().next());

"aaa".includes("a");
