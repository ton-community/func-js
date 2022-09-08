import * as TonCompiler from '../src/compiler';
import fs from 'fs';
import {Cell} from 'ton';

describe('ton-compiler', () => {

    const walletCodeCellHashBase64 = "hA3nAz+xEJePYGrDyjJ+BXBcxSp9Y2xaAFLRgGntfDs=";

    it('should compile ToN contracts writen on func', async () => {
        let confObj = {
            optLevel: 2,
            sources: {}
        };
        var code = fs.readFileSync('./test/contracts/stdlib.fc', { encoding: 'utf-8'});
        Object.assign(confObj["sources"], {"stdlib.fc": code});
        code = fs.readFileSync('./test/contracts/wallet-code.fc', { encoding: 'utf-8'});
        Object.assign(confObj["sources"], {"wallet-code.fc": code});

        var result = await TonCompiler.funcCompile(confObj);

        expect(result.status).toEqual('ok');

        let codeCell = Cell.fromBoc(Buffer.from((result as TonCompiler.SuccessResult).code_boc, "base64"))[0];

        let hash = codeCell.hash().toString('base64');

        expect(hash).toEqual(walletCodeCellHashBase64);
    });
});