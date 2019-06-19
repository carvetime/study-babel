"use strict";

require("core-js/modules/es6.object.assign");

var demofunc5 = function demofunc5(res) {
  console.log("func 5");
};

var data = Object.assign({
  age: 18
}, {
  name: 'carvetime'
});
var jsonData = JSON.stringify(data);
alert(jsonData);