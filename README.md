# TON FunC compiler

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://makeapullrequest.com)
[![Version npm](https://img.shields.io/npm/v/@ton-community/func-js.svg?logo=npm)](https://www.npmjs.com/package/@ton-community/func-js)

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
yarn add @ton-community/func-js
```

or 

```bash
npm i @ton-community/func-js
```

## Usage example

```typescript
import {compileFunc, compilerVersion} from '@ton-community/func-js';
import {Cell} from 'ton';

async function main() {
    // You can get compiler version 
    let version = await compilerVersion();
    
    let result = await compileFunc({
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

You can also pass a resolver (a function of type `(path: string) => string`) into `sources` instead of a source map object, for example if `main.fc` and all contracts used by it (such as `stdlib.fc`) are located in the same directory as the compiling file, you can use the following:
```typescript
import { readFileSync } from "fs";
import { compileFunc } from "@ton-community/func-js";

let result = await compileFunc({
    // Entry points of your project
    entryPoints: ['main.fc'],
    // Sources
    sources: (path) => readFileSync(__dirname + '/' + path).toString()
});
```
And the resolver will be called for each required source file (including the entrypoints) using the same name as in the `#include` statement. Note however that the resolver must be synchronous and must return a string; if you need the resolver to get files from the network, you can repeatedly run the compiler with the known sources, check if the compilation failed, download the required sources and rerun the compiler until compilation succeeds.

Note that all FunC source files contents used in your project should be passed to `sources` (if it is a source map) or be resolvable by it (if it is a resolver), including:
- entry points
- stdlib.fc (if you use it)
- all files included in entry points

## License

This package is released under the [MIT License](LICENSE).
