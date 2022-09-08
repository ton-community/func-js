var CompilerModule = require('./wasmlib/funcfiftlib.js');

/*
 * CompilerConfig example:
 * {
 *      sources: {
 *          "stdlib.fc": "<stdlib code>",
 *          "contract1: "<contract1 code>",
 *          ...
 *      },
 *      optLevel: number of <0-2> (recommend 2)
 * }
 *
 */
export type CompilerConfig = {
    sources: { [filename: string]: string },
    optLevel: number
};

/*
 * CompileResult example:
 * If success
 * {
 *      status: 'ok',
 *      code_boc: <serialized code cell into BOC with base64 encoding>,
 *      fift_code: <fift code from func compiler>
 * }
 * If failure
 * {
 *      status: 'error',
 *      message: <the message with reason of failure>
 * }
 *
 */
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

export async function funcCompile(compileConfig: CompilerConfig): Promise<CompileResult> {

    let mod = await CompilerModule();

    let sourcesArr: string[] = [];

    (Object.keys(compileConfig.sources)).forEach((fileName) => {
        sourcesArr.push(fileName);
        let code: string = compileConfig.sources[fileName] as any;
        mod.FS.writeFile(fileName, code);
    });

    let configJson = JSON.stringify({
        sources: sourcesArr,
        optLevel: compileConfig.optLevel
    });

    let configJsonPTR = await mod._malloc(configJson.length + 1);
    mod.stringToUTF8(configJson, configJsonPTR, configJson.length + 1);

    let retPTR = await mod._func_compile(configJsonPTR);

    await mod._free(configJsonPTR);

    let retJson = await mod.UTF8ToString(retPTR);

    await mod._free(retPTR);

    return JSON.parse(retJson);
}