

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
默认的在终端执行babel --out方法实际也就是@babel/core对代码进行了parse和transform，因为没有做任何的参数插件配置，所以代码还是返回原来的代码。