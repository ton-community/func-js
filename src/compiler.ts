var CompilerModule = require('./wasmlib/funcfiftlib.js');

export type CompilerConfig = {
    sources: { [filename: string]: string },
    optLevel: number
};

export type SuccessResult = {
    status: "ok",
    code_boc: string,
    fift_code: string
};

export type ErrorResult = {
    status: "error",
    message: string
};

export type CompileResult = SuccessResult | ErrorResult;

/*
 * CompilerConfig example:
 * {
 *      sources: {
 *          "filename1": "<func code>",
 *          "filename2": "<func code>",
 *          ...
 *      },
 *      optLevel: number of <0-2> (recommend 2)
 * }
 *
 */

export async function funcCompile(compileConfig: CompilerConfig): Promise<CompileResult> {

    let mod = await CompilerModule();

    let sourcesArr: Array<string> = [];

    (Object.keys(compileConfig.sources)).forEach((fileName) => {
        sourcesArr.push(fileName);
        let code: string = compileConfig.sources[fileName] as any;
        mod.FS.writeFile(fileName, code);
    });
    /*
    var code = fs.readFileSync('./contracts/stdlib.fc');
    mod.FS.writeFile('stdlib.fc', code);

    code = fs.readFileSync('./contracts/constants.fc');
    mod.FS.writeFile('constants.fc', code);

    code = fs.readFileSync('./contracts/sc-p2ppurch.fc');
    mod.FS.writeFile('sc-p2ppurch.fc', code);
    */

    let configJson = JSON.stringify({
        sources: sourcesArr,
        optLevel: compileConfig.optLevel
    });

    let configJsonPTR = mod._malloc(configJson.length + 1);
    mod.stringToUTF8(configJson, configJsonPTR, configJson.length + 1);

    let retPTR = mod._func_compile(configJsonPTR);

    mod._free(configJsonPTR);

    let retJson = mod.UTF8ToString(retPTR);

    mod._free(retPTR);

    return JSON.parse(retJson);
}