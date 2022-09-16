# TON FunC compiler

[![Version npm](https://img.shields.io/npm/v/@ton.org/func-js.svg?logo=npm)](https://www.npmjs.com/package/@ton.org/func-js)

Cross-platform bindings for TON FunC compiler.

## Features

- 🚀 No need to compile of download FunC binaries
- 📦 Works both in Node.js & WEB (WASM support is required)
- ⚙️ Compiles straight to BOC with code Cell
- ⚙️ Assembly is returned fot debugging purposes
- 📁 Does not depend on file-system

## How it works

Internally this package uses both FunC compiler and Fift interpreter combined to single lib compiled to WASM.

Simple schema:
```
(your code) -> WASM(FunC -> Fift -> BOC)
```

Sources for the internal lib could be found [here](https://github.com/ton-blockchain/ton/tree/testnet/crypto/funcfiftlib).

## Install

```bash
yarn add @ton.org/func-js
```

or 

```bash
npm i @ton.org/func-js
```

## Usage example

```typescript
import {compileFunc, compilerVersion} from 'ton-compiler';
import {Cell} from 'ton';


async function main() {
    // You can get compiler version 
    let version = await compilerVersion();
    
    let result = await funcCompile({
        // Entry points of your project
        entryPoints: ['main.fc'],
        // Sources
        sources: {
            "stdlib.fc": "<stdlibCode>",
            "main.fc": "<contractCode>",
            // Rest of the files which are included in main.fc if some
        }
    });

    if (result.status === 'error') {
        console.error(result.message)
        return;
    }

    // result.codeBoc contains base64 encoded BOC with code cell 
    let codeCell = Cell.fromBoc(Buffer.from(result.codeBoc, "base64"))[0];
    
    // result.fiftCode contains assembly version of your code (for debug purposes)
    console.log(result.fiftCode)
}
```

Note that all FunC source files contents used in your project should be passed to ```sources```, including:
- entry points
- stdlib.fc (if you use it)
- all files included in entry points

## License

This package is released under the [MIT License](LICENSE).