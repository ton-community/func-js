import * as TonCompiler from '../dist/compiler';
import fs from 'fs';

describe('ton-compiler', () => {

    it('should compile ToN contracts writen on func', async () => {
        let confObj = {
            optLevel: 2,
            sources: new Object()
        };
        var code = fs.readFileSync('./contracts/stdlib.fc', { encoding: 'utf-8'});
        Object.assign(confObj["sources"], {"stdlib.fc": code});
        code = fs.readFileSync('./contracts/constants.fc', { encoding: 'utf-8'});
        Object.assign(confObj["sources"], {"constants.fc": code});
        code = fs.readFileSync('./contracts/sc-p2ppurch.fc', { encoding: 'utf-8'});
        Object.assign(confObj["sources"], {"sc-p2ppurch.fc": code});

        var result = await TonCompiler.tonCompile(confObj);
        console.log(result);
    });
});