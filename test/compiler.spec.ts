import * as TonCompiler from '../src/index';
import fs from 'fs';
import {Cell} from 'ton';

describe('ton-compiler', () => {

    const walletCodeCellHashBase64 = "hA3nAz+xEJePYGrDyjJ+BXBcxSp9Y2xaAFLRgGntfDs=";

    const compilerVersion = {
        funcVersion: "0.2.0",
        funcFiftLibCommitHash: "4dc54cefc49250fd39dcbe6d764b4493870354dc",
        funcFiftLibCommitDate: "2022-09-15 00:53:02 +0700"
    }

    it('should return compiler version', async () => {

        let version = await TonCompiler.compilerVersion();

        expect(version).toEqual(compilerVersion);

    });

    it('should compile TON contracts writen on func without includes', async () => {
        let confObj = {
            optLevel: 2,
            entryPoints: ["stdlib.fc", "wallet-code.fc"],
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

    it('should compile TON contracts writen on func with includes', async () => {
        let confObj = {
            optLevel: 2,
            entryPoints: ["wallet-code.fc"],
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

    it('should failed cause one of entry point has not provided in sources', async () => {
        let confObj = {
            optLevel: 2,
            entryPoints: ["stdlib.fc", "wallet-code.fc", "undefined.fc"],
            sources: {
                "stdlib.fc": fs.readFileSync('./test/contracts/stdlib.fc', { encoding: 'utf-8' }),
                "wallet-code.fc":  fs.readFileSync('./test/contracts/wallet-code.fc', { encoding: 'utf-8' })
            }
        };

        let result = await TonCompiler.funcCompile(confObj);


        expect(result.status).toEqual('error');

        result = result as TonCompiler.ErrorResult;

        expect(result.message).toEqual("The entry point undefined.fc has not provided in sources.");
    });

    it('should successed compile contract with pragma version ^0.2.0', async () =>{
        let confObj = {
            optLevel: 2,
            entryPoints: ["wallet-code.fc"],
            sources: {
                "stdlib.fc": fs.readFileSync('./test/contracts/stdlib.fc', { encoding: 'utf-8' }),
                "wallet-code.fc":  fs.readFileSync('./test/contracts/wallet-code-with-pragma.fc', { encoding: 'utf-8' })
            }
        };

        let result = await TonCompiler.funcCompile(confObj);

        expect(result.status).toEqual('ok');

        result = result as TonCompiler.SuccessResult;

        let codeCell = Cell.fromBoc(Buffer.from(result.codeBoc, "base64"))[0];
        let hash = codeCell.hash().toString('base64');
        expect(hash).toEqual(walletCodeCellHashBase64);
    });

    it('should failed to compile contract with pragma version <0.2.0', async () =>{
        let confObj = {
            optLevel: 2,
            entryPoints: ["wallet-code.fc"],
            sources: {
                "stdlib.fc": fs.readFileSync('./test/contracts/stdlib.fc', { encoding: 'utf-8' }),
                "wallet-code.fc":  fs.readFileSync('./test/contracts/wallet-code-with-bad-pragma.fc', { encoding: 'utf-8' })
            }
        };

        let result = await TonCompiler.funcCompile(confObj);

        expect(result.status).toEqual('error');

        result = result as TonCompiler.ErrorResult;

        expect(result.message.indexOf(`FunC version ${compilerVersion.funcVersion} does not satisfy condition <0.2.0`) != undefined);
    });
});