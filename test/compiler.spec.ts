import * as TonCompiler from '../src/compiler';
import fs from 'fs';
import {Cell} from 'ton';

describe('ton-compiler', () => {

    const walletCodeCellHashBase64 = "hA3nAz+xEJePYGrDyjJ+BXBcxSp9Y2xaAFLRgGntfDs=";

    it('should return compiler version', async () => {

        let versionTest = JSON.parse(fs.readFileSync('./test/test_version.json', { encoding: 'utf-8' }));

        let version = await TonCompiler.compilerVersion();

        expect(version).toEqual(versionTest);

    });

    it('should compile TON contracts writen on func', async () => {
        let confObj = {
            optLevel: 2,
            sources: {
                "stdlib.fc": fs.readFileSync('./test/contracts/stdlib.fc', { encoding: 'utf-8' }),
                "wallet-code.fc":  fs.readFileSync('./test/contracts/wallet-code.fc', { encoding: 'utf-8' })
            }
        };

        let result = await TonCompiler.funcCompile(confObj);
        expect(result.status).toEqual('ok');

        result = result as TonCompiler.SuccessResult;

        let codeCell = Cell.fromBoc(Buffer.from(result.codeBoc, "base64"))[0];
        let hash = codeCell.hash().toString('base64');
        expect(hash).toEqual(walletCodeCellHashBase64);
    });
});