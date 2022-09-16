const fs = require('fs')

const wasmData = fs.readFileSync('./src/wasmlib/funcfiftlib.wasm')
const out = `module.exports = { FuncFiftLibWasm: '${wasmData.toString('base64')}' }`

fs.writeFileSync('./src/wasmlib/funcfiftlib.wasm.js', out)
