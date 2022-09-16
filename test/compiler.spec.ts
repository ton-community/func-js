import * as TonCompiler from '../src/index';
import fs from 'fs';
import {Cell} from 'ton';

describe('ton-compiler', () => {

    const walletCodeCellHashBase64 = "hA3nAz+xEJePYGrDyjJ+BXBcxSp9Y2xaAFLRgGntfDs=";

    it('should return compiler version', async () => {

        let versionTest = JSON.parse(fs.readFileSync('version.json', { encoding: 'utf-8' }));

        let version = await TonCompiler.compilerVersion();

        expect(version).toEqual(versionTest);

    });

    it('should compile TON contracts writen on func without entry point', async () => {
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

    it('should compile TON contracts writen on func with entry point', async () => {
        let confObj = {
            optLevel: 2,
            entryPoint: "wallet-code.fc",
            sources: {
                "stdlib.fc": fs.readFileSync('./test/contracts/stdlib.fc', { encoding: 'utf-8' }),
                "wallet-code.fc":  fs.readFileSync('./test/contracts/wallet-code-with-include.fc', { encoding: 'utf-8' })
            }
        };

        let result = await TonCompiler.funcCompile(confObj);

        expect(result.status).toEqual('ok');

        result = result as TonCompiler.SuccessResult;

        let codeCell = Cell.fromBoc(Buffer.from(result.codeBoc, "base64"))[0];
        let hash = codeCell.hash().toString('base64');
        expect(hash).toEqual(walletCodeCellHashBase64);
    });

    it("should returns error if entry point doesn't exist among sources", async () => {
        let confObj = {
            optLevel: 2,
            entryPoint: "wallet-code.fc",
            sources: {
                "stdlib.fc": fs.readFileSync('./test/contracts/stdlib.fc', { encoding: 'utf-8' }),
            }
        };

        let result = await TonCompiler.funcCompile(confObj);

        expect(result.status).toEqual('error');

        result = result as TonCompiler.ErrorResult;

        expect(result.message).toEqual("Entry point wallet-code.fc wasn't found among sources.")
    });


});