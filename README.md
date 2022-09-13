# TON Func Contract Compiler

This package aims to be headless FunC compiler. It compiles you FunC source code straight to BOC.

The resulting BOC is encoded to base64 format. Also result has fift code of your contract.

## How it works

Internally this package uses both FunC compiler and Fift interpreter combined to one lib and compiled to WASM.
Also it has no dependency on file system, so you can use it in browsers too.

## Usage example

```typescript
import {compileFunc} from 'ton-compiler';
import {Cell} from 'ton';


async function buildCodeCell() {
    let conf = {
        optLevel: 2,
        sources: {
            "stdlib.fc": "<stdlibCode>",
            "yourContract": "<contractCode>"
            // another files if needed
        }
    };

    let result = await funcCompile(conf);

    if (result.status === 'error') {
        // ...
        return;
    }

    let codeCell = Cell.fromBoc(Cell.fromBoc(Buffer.from(result.code_boc, "base64")))[0];

    return codeCell;
}
```

Also you can get compiler version if you want notify us about some issues.


```typescript
import {compilerVersion} from 'ton-compiler';

async function getCompilerVersion() {

    let version = await compilerVersion();

    return version;
}
```

## WEB integration

The WASM library contains tools wich work in web and nodejs both. So you sould configure your webpack config for resolve some nodejs requires.

```
// webpack.config.js
resolve: {
    fallback: {
        fs: false,
        path: false,
        crypto: false
    }
}
```