# ToN Func Contract Compiler

This package allows to compile FUNC smart contracts to the BOC.

```
func_contract.fc -> func_compile -> fift_compile -> boc
```

The result BOC is encoded to base64 format. Also result has fift code of your contract.

## How it works

The package internally uses origin func and fift compilers wich combined to one lib and builded to WASM.

## Usage

You sould added to sources original [stdlib.fc](https://github.com/ton-blockchain/ton/blob/master/crypto/smartcont/stdlib.fc) file from ToN blockchain repo.

It ussefully with [ton lib](https://github.com/tonwhales/ton)

```typescript
import * as TonCompiler from 'ton-compiler';
import {Cell} from 'ton';


async function run() {
    let conf = {
        optLevel: 2,
        sources: {
            "stdlib.fc": "<stdlibCode>",
            "yourContract": "<contractCode>"
            // another files if needed
        }
    };

    let result = await TonCompiler.funcCompile(conf);

    if (result.status === 'error') {
        // ...
        return;
    }

    result = result as TonCompiler.SuccessResult;

    let cellCode = Cell.fromBoc(Cell.fromBoc(Buffer.from(result.code_boc, "base64")))[0];

    return cellCode;
}
```
