
var babel = require("@babel/core");

var parsedAst = babel.parse('var demofunc0 = res => {console.log("func 0")}', {});
console.log(parsedAst);

var result = babel.transformFromAstSync(parsedAst, {});
console.log("result",result);