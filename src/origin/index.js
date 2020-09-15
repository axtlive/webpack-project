// import lodash from "lodash";
// console.log("lodash", lodash);
// console.log("window.lodash", window.lodash);
// const str = require("./a");

// console.log("hello world?");
// console.log(str);

import "./index.css";

// require("./index.less");

// const fn = () => {
//   console.log("dddddd33ddd");
//   console.log("dddddd33ddd");
// };

// fn();

// @log
// class A {
//   a = 1;
// }

// function log(target) {
//   console.log("target", target);
// }

// 打包图片
// 1. 在js中创建图片来引入
// 2. 在css中引入  background('url')
// 3. 在html中 <img src=''>

import sxp from "./s.jpg";
const img = new Image();
console.log(sxp);
img.src = sxp;
document.body.appendChild(img);

// 制造一个错误
// console.lg("llll");

fetch("http://localhost:8080/api/user")
  .then(r => r.json())
  .then(res => console.log(res));
