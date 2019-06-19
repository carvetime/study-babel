
<!-- ---
title: "babel7 入门"
date: 2019-06-17 09:24:29
categories:
- babel
- "@babel/core"
tags:
- "@babel/core"
--- -->

## @bable/core

@bable/core是babel7的核心包，主要对提供对代码的语法词法分析及转换的方法

首先npm安装下`@bable/core`包
```bash
npm install @babel/core --save-dev
```

我们下简单看下`@bable/core`提供的几个核心方法

index00.js
```js
const babel = require("@babel/core");

var parsedAst = babel.parse('const demofunc0 = res => {console.log("func 0")}', {});
console.log(parsedAst);
```
打印出来就是AST语法树
```
Node {
  type: 'File',
  start: 0,
  end: 46,
  loc:
   SourceLocation {
     start: Position { line: 1, column: 0 },
     end: Position { line: 1, column: 46 } },
  program:
   Node {
     type: 'Program',
     start: 0,
     end: 46,
     loc: SourceLocation { start: [Position], end: [Position] },
     sourceType: 'module',
     interpreter: null,
     body: [ [Node] ],
     directives: [] },
  comments: [] }
```

接着我们对AST进行转换操作
```js
var result = babel.transformFromAstSync(parsedAst, {});
console.log("result",result);
```

打印出后的代码
```js
{ metadata: {},
  options:
   { babelrc: false,
     configFile: false,
     passPerPreset: false,
     envName: 'development',
     cwd: '/Users/xxxx/learn/js/study/study-babel',
     root: '/Users/xxxx/learn/js/study/study-babel',
     plugins: [],
     presets: [],
     parserOpts:
      { sourceType: 'module', sourceFileName: undefined, plugins: [] },
     generatorOpts:
      { filename: undefined,
        auxiliaryCommentBefore: undefined,
        auxiliaryCommentAfter: undefined,
        retainLines: undefined,
        comments: true,
        shouldPrintComment: undefined,
        compact: 'auto',
        minified: undefined,
        sourceMaps: false,
        sourceRoot: undefined,
        sourceFileName: 'unknown' } },
  ast: null,
  code: 'var demofunc0 = res => {\n  console.log("func 0");\n};',
  map: null,
  sourceType: 'module' }
```

可见AST又被转换还原成了之前箭头方法`code: 'var demofunc0 = res => {\n  console.log("func 0");\n};`

下面我们通过babel提供命令行工具来执行验证下@babel/core

首先我们先安装下@babel-cli
```bash
npm install --save-dev @babel/cli
```

然后执行终端命令
```bash
npx babel ./examples/01/code01/src/index01.js --out

...
const demofunc1 = res => {
  console.log("func 1");
};
...
```
默认的在终端执行babel --out方法实际也就是@babel/core对代码进行了parse和transform，bable/core只提供核心方法，具体要要怎么转换要做什么具体工作都又插件来完成，因为没有做任何的参数插件配置，所以代码还是返回原来的代码。

## @babel/plugin-transform-arrow-functions
接下来我们试试使用插件后的效果比如我们将es6的箭头函数转成普通的函数

```bash
npm install --save  @babel/plugin-transform-arrow-functions

npx babel ./examples/01/code01/src/index02.js --out --plugins=@babel/plugin-transform-arrow-functions

...
const demofunc2 = function (res) {
  console.log("func 2");
};
...
```
## @babel/plugin-transform-classes
另外还有es6新增的class定义

```bash
npm install --save-dev @babel/plugin-transform-classes

npx babel ./examples/01/code01/src/index03.js --out --plugins=@babel/plugin-transform-classes
...
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

let Person =
/*#__PURE__*/
function () {
  function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
  }

  _createClass(Person, [{
    key: "sing",
    value: function sing() {
      console.log(this.name + 'is singing');
    }
  }]);

  return Person;
}();

const demofunc5 = res => {
  console.log("func 5");
};

var p = new Person("xiao wang");
p.sing();
...
```


## @babel/preset-env
babel的插件有很多，如果我们每个插件都逐一添加确实比较麻烦，这时候@babel/preset-env就是用来解决这一繁琐工作的。

配置下.babelrc
```json
{
    "presets": [
        ["@babel/preset-env"]
    ]
}
```

安装preset-env并执行babel
```bash
npx babel ./examples/01/code01/src/index04.js --out --preset=@babel/preset-env
npx babel ./examples/01/code01/src/index04.js

...
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Person =
/*#__PURE__*/
function () {
  function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
  }

  _createClass(Person, [{
    key: "sing",
    value: function sing() {
      console.log(this.name + 'is singing');
    }
  }]);

  return Person;
}();

var demofunc4 = function demofunc4(res) {
  console.log("func 4");
};

var p = new Person("xiao wang");
p.sing();
...
```

.babelrc默认不配置情况下是babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017的集合，所以class和箭头函数都会转换。

接下来我们稍微做下改动
```json
{
    "presets": [
        ["@babel/preset-env",
            {
                "targets": {
                  "node": "10"
                }
              }
        ]
    ]
}
```

```bash
npx babel ./examples/01/code01/src/index04.js

...
"use strict";

class Person {
  constructor(name) {
    this.name = name;
  }

  sing() {
    console.log(this.name + 'is singing');
  }

}

const demofunc4 = res => {
  console.log("func 4");
};

var p = new Person("xiao wang");
p.sing();
...
```
这时候代码是原样输出，这是因为@babel/preset-env对输出环境做了预判，@babel/preset-env会检查代码是否可以在node10上可以正常运行，node10是否有代码中的特性，如果有那么babel就会原样输出，如果没有那么babel就会将其转换成老的方法特性做到兼容。


## @babel/ployfill
那么是不是有了@babel/preset-env这样我们就兼容我们想要兼容的所有浏览器环境呢，然而并非如此，@babel/preset-env只将不同版本的写法，高版本转化为低版本，保证正确统一的语义，并不会去增加或修改原有的方法或属性，有些新增方法全局或原型方法在不同浏览器环境的不同，则需要@babel/ployfill来做兼容

我们首先来看下没有polyfill的情况

.babelrc
```json
{
    "presets": [
        ["@babel/preset-env",
            {
                "targets": {
                  "chrome": "15"
                }
              }
        ]
    ]
}
```

```bash
npx babel ./examples/01/code01/src/index05.js

...
"use strict";

var demofunc5 = function demofunc5(res) {
  console.log("func 5");
};

var data = Object.assign({
  age: 18
}, {
  name: 'carvetime'
});

var jsonData = JSON.stringify(data);

alert.log(data);
...
```
我们发现箭头函数被转成了普通的js函数，但是Object.assign放并没有进行转换，这是es6新增的方法，babel并不进行兼容处理，下面我们来尝试下polyfill。

先安装下polyfill，这里需要注意，是安装在生产环境，polyfill是在浏览器环境运行时才加载的，所以和其他的开发环境编译有所不同
```bash
npm install --save @babel/polyfill 
```

.babelrc
```json
{
    "presets": [
        ["@babel/preset-env",
            {
                "targets": {
                  "firefox": "15"
                },
                "useBuiltIns": "usage"
              },
              
        ]
    ]
}
```

然后执行下编译
```
npx babel ./examples/01/code01/src/index05.js

...

WARNING: We noticed you're using the `useBuiltIns` option without declaring a core-js version. Currently, we assume version 2.x when no version is passed. Since this default version will likely change in future versions of Babel, we recommend explicitly setting the core-js version you are using via the `corejs` option.

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

alert.log(data);
...
```


babel7开始使用`"useBuiltIns": "usage"`就可以使用polyfill功能，通过警告可知polyfill功能放到core-js里面啦,默认不配置的话是core-js2，我们再稍微改下


```bash
npm install --save core-js@2 
```

因为需要在运行时环境`require core-js`我们这时候需要用webpack打包以支持commonjs，所以我们先配置下webpack.config.js
```
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './examples/01/code01/src/index05.js',
    mode: "development",
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './examples/01/code01/dist')
    },
    module: {
        rules: [
          {
            test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
          }
        ]
    }
}
```
最后我们再运行下webapck
```
npx webpack
```

此时用用mac电脑最新版的Chrome(版本号74)浏览器打开dist/index.html文件会提示一个弹框`This page says {"age":18,"name":"carvetime"}`,用Firefox(版本号15)打开也是显示弹窗`{"age":18,"name":"carvetime"}`，因为此时我们配置的`"targets": {"firefox": "15"}`，所以能在Firefox老版本15上运行，那么最新版本Chrome肯定也是能正常运行。

我们看下dist/bundle.js的部分代码
```js
__webpack_require__.r(__webpack_exports__);
var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/core-js/modules/es6.object.assign.js");
var core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(core_js_modules_es6_object_assign__WEBPACK_IMPORTED_MODULE_0__);
var demofunc5 = function demofunc5(res) {
    console.log("func 5");
};
var data = Object.assign({ age: 18}, {  name: 'carvetime'});
var jsonData = JSON.stringify(data); alert(jsonData);
```
不难发现，箭头函数转成了普通函数，require了es6.object.assign的方法，所以两个不同版本的浏览器都可以正常运行。



接下来我们稍微改动下配置`"targets": {"firefox": "64"}`，我们再`npx webpack`一次，然后分别刷新两个浏览器此时，Chrome还是正常弹窗，而老版本的Firefox则报错`SyntaxError: syntax error const demofunc5 = res => { `，因为此时我们制定在Firefox64的版本上可以运行，因为Firefox64的版本是支持箭头函数的，所以此时不会转换箭头函数，在Firefox15老版本浏览器上不支持新箭头语法因此会报错

我们再看下dist/bundle.js的部分代码
```js
const demofunc5 = res => { console.log("func 5");
};
var data = Object.assign({  age: 18}, {  name: 'carvetime'});
var jsonData = JSON.stringify(data);\nalert(jsonData);
```
这时候代码是原样输出，没有箭头函数转换也没有引入core的Object.assign的的方法，所以老版本会包箭头函数语法错误，那么我们再去掉箭头函数再编译下看看dist/bundle.js文件部分代码
```js
var data = Object.assign({  age: 18}, {  name: 'carvetime'});
var jsonData = JSON.stringify(data);\nalert(jsonData);
```
这时候Firefox15的浏览器报还是报错`Object.assign is not a function`,也是一样的原因，因为Object.assign是es6新增的方法，因为我们配置`"targets": {"firefox": "64"}`是支持Firefox64，在火狐64上是支持有这个Object方法的，所以编译出来的代码还是原样，导致老版本浏览器中就会无法识别这个方法。


## @babel/runtime

我们先对src/index06.js编译下看
```bash
npx babel ./examples/01/code01/src/index06.js 
```

产生如下代码
```js
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Person =
/*#__PURE__*/
function () {
  function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
  }

  _createClass(Person, [{
    key: "sing",
    value: function sing() {
      console.log(this.name + 'is singing');
    }
  }]);

  return Person;
}();

var demofunc6 = function demofunc6(res) {
  console.log("func 6");
};

var p = new Person("xiao wang");
p.sing();
```
可见针对es6的class新语法，babel专门定义可`_classCallCheck`,`_defineProperties`,`_createClass`等help工具方法协助转换成老的class方法，如果文件我们生产多个文件的话就可以每个文件都包含这些help方法，这时候@babel/plugin-transform-runtime就出现了，它可以用require的方式引入模块里的helper方法从而避免了代码的冗余重复。

我们先安装下@babel/plugin-transform-runtime
```bash
npm install --save-dev @babel/plugin-transform-runtime
```

接着我们配置下.babelrc
```json
{
    "presets": [
        ["@babel/preset-env",
            {
                "targets": {
                  "firefox": "15"
                },
                "useBuiltIns": "usage"
              },
              
        ]
    ],
    "plugins": [
      "@babel/plugin-transform-runtime"
    ]
}
```

最后run一下
```
npx babel ./examples/01/code01/src/index06.js  
```

看下输出结果
```js
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var Person =
/*#__PURE__*/
function () {
  function Person(name) {
    (0, _classCallCheck2.default)(this, Person);
    this.name = name;
  }

  (0, _createClass2.default)(Person, [{
    key: "sing",
    value: function sing() {
      console.log(this.name + 'is singing');
    }
  }]);
  return Person;
}();

var demofunc6 = function demofunc6(res) {
  console.log("func 6");
};

var p = new Person("xiao wang");
p.sing();
```
对比代码发现，代码确实少了很多，`_classCallCheck`,`_defineProperties`,`_createClass`也都是直接从模块引入，我们试试用webpack试试在浏览器上是否可以正常运行。


```bash
npx webpack

...
ERROR in ./examples/01/code01/src/index06.js
Module not found: Error: Can't resolve '@babel/runtime/helpers/classCallCheck'
...
```
此时运行webpack会报错提示找不到`@babel/runtime/helpers/createClass`模块，这时候我们就需要另外一个插件`@babel/runtime`,`@babel/plugin-transform-runtime`是帮我们根据环境条件require相应的模块方法，但是所以的help方法都统一存放在`@babel/runtime`中,那么我们先安装下

```bash
npm install --save-pro @babel/runtime
```
这里需要注意下，`@babel/runtime`不是和之前插件一样安装在开发依赖中，之前很多插件都是在开环环境中编译，但这个`@babel/runtime`是在运行时生产环境中具体需要require的，所以肯定是需要安装在生成环境中，接着我们再`npx webpack`下，这时候成功运行，我们再查看下src/bundle.js

```js
eval("__webpack_require__.r(__webpack_exports__);
 var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/@babel/runtime/helpers/classCallCheck.js");
 var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/@babel/runtime/helpers/createClass.js");var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
var Person = function () { function Person(name) { 
   _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Person);
    this.name = name; 
}
_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(
  Person, 
  [{ key: "sing",    value: function sing() {  
  console.log(this.name + ' is singing'); }}
  ]);
  return Person;
  }();
    var demofunc6 = function demofunc6(res) {
    console.log("func 6");};
    var p = new Person("xiao wang6");
    p.sing();
);
```

这样方法做到了复用bundle.js的代码量明显减少，如果多个文件就只共引用一份helper代码，然后两个新老版本都可以正常弹窗alert`xiao wang6 is singing`

## @babel/runtime-corejs2
这时候我们再在index.js Person里面加一个es6的新增的方法看看
```
info(){
      var data = Object.assign({age:18},{name:'carvetime'});
      alert(JSON.stringify(data))
}
```
`npx webpack`运行再在浏览器打开，发现低版本的Firefox15报错显示`TypeError: Object.assign is not a function`，查阅官方文档我们发现
>We have separated out Babel's helpers from it's "polyfilling" behavior in runtime. More details in the PR.
@babel/runtime now only contains the helpers, and if you need core-js you can use @babel/runtime-corejs2 and the option provided in the transform. For both you still need the @babel/plugin-transform-runtime

可见es6新增的全局原型等方法polyfill这一块代码已经从runtime中分离出来，需要实现polyfill功能必须安装@babel/runtime-corejs2，我们来试试
```bash
npm install @babel/runtime-corejs2
```

同时我们修改下.babelrc
```diff
{
  "plugins": [
-   ["@babel/plugin-transform-runtime"],
+   ["@babel/plugin-transform-runtime", {
+     "corejs": 2,
+   }],
  ]
}
```
这时候我们再来运行下`npx webpack`,我们来看下dist/bundle.js文件
```diff
__webpack_require__.r(__webpack_exports__);
+   /* harmony import */ var 
+   _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
++ /* harmony import */ var ++ _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__);
+ /* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
++  /* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);

```
相比之前新增了stringify，assign的方法，然后我们再用新来版本浏览器打开发现都可以正常弹框，没有任何异常。

## useBuiltIns
持外babel7提供了另外一个按需导入polyfill的方法`useBuiltIns: "usage"`我们也来试试

.babelrc
```json
{
  "presets": [
      ["@babel/preset-env",
          {
              "targets": {
                "firefox": "15"
              },
              "corejs": 2,
              "useBuiltIns": "usage",
              "debug": true
            },
            
      ]
  ]
}
```
然后`npx webpack`运行到高低版本浏览器上都可以正常显示
