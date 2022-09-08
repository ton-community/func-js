import * as TonCompiler from '../src/compiler';
import fs from 'fs';
import {Cell} from 'ton';

describe('ton-compiler', () => {

    const walletCodeCellHashBase64 = "hA3nAz+xEJePYGrDyjJ+BXBcxSp9Y2xaAFLRgGntfDs=";

    it('should compile ToN contracts writen on func', async () => {
        let confObj = {
            optLevel: 2,
            sources: {
                "stdlib.fc": fs.readFileSync('./test/contracts/stdlib.fc', { encoding: 'utf-8'}),
                "wallet-code.fc":  fs.readFileSync('./test/contracts/wallet-code.fc', { encoding: 'utf-8'})
            }
        };

        let result = await TonCompiler.funcCompile(confObj);
        expect(result.status).toEqual('ok');

        let codeCell = Cell.fromBoc(Buffer.from((result as TonCompiler.SuccessResult).code_boc, "base64"))[0];
        let hash = codeCell.hash().toString('base64');
        expect(hash).toEqual(walletCodeCellHashBase64);
    });
});