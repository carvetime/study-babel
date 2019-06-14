
const sourceCode = 'const demofunc1 = res => {\n  console.log("func 1");\n}'

const parsedAst = babel.parse(sourceCode, {});

console.log(parsedAst);

const result = babel.transformFromAstSync(parsedAst, {});

console.log("result",result);