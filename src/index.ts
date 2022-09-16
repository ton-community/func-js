const CompilerModule = require('./wasmlib/funcfiftlib.js');

/*
 * CompilerConfig example:
 * {
 *      // The main contract filename, wich contain necessary includes.
 *      // If your project has no includes - do not provide this field.
 *      entryPoint: "contract1",
 *      // All sources from your project
 *      sources: {
 *          "stdlib.fc": "<stdlib code>",
 *          "contract1: "<contract1 code>",
 *          ...
 *      },
 *      // FUNC compiler optimization level
 *      optLevel: number of <0-2> (recommend 2)
 * }
 *
 */
export type CompilerConfig = {
    entryPoint?: string;
    sources: { [filename: string]: string },
    optLevel: number
};

export type SuccessResult = {
    status: "ok",
    codeBoc: string,
    fiftCode: string
};

export type ErrorResult = {
    status: "error",
    message: string
};

export type CompileResult = SuccessResult | ErrorResult;

export type CompilerVersion = {
    funcVersion: string,
    funcFiftLibCommitHash: string,
    funcFiftLibCommitDate: string
}

export async function compilerVersion(): Promise<CompilerVersion> {
    let mod = await CompilerModule();

    let versionJsonPointer = mod._version();
    let versionJson = mod.UTF8ToString(versionJsonPointer);
    mod._free(versionJsonPointer);

    return JSON.parse(versionJson);
}

export async function funcCompile(compileConfig: CompilerConfig): Promise<CompileResult> {
    let mod = await CompilerModule();

    mod.FS.mkdir("/contracts");

    let entryPointFound = false;
    let sourcesArr: string[] = [];
    for (let fileName in compileConfig.sources) {
        let source = compileConfig.sources[fileName]
        if (!compileConfig.entryPoint) {
            sourcesArr.push(`/contracts/${fileName}`);
        }
        else if (!entryPointFound && fileName === compileConfig.entryPoint) {
            entryPointFound = true;
            sourcesArr.push(`/contracts/${fileName}`);
        }
        mod.FS.writeFile(`/contracts/${fileName}`, source);
    }

    if (compileConfig.entryPoint && !entryPointFound) {
        return {
            status: "error",
            message: `Entry point ${compileConfig.entryPoint} wasn't found among sources.`
        };
    }

    let configJson = JSON.stringify({
        sources: sourcesArr,
        optLevel: compileConfig.optLevel
    });

    let configJsonPointer = mod._malloc(configJson.length + 1);
    mod.stringToUTF8(configJson, configJsonPointer, configJson.length + 1);

    let resultPointer = mod._func_compile(configJsonPointer);

    mod._free(configJsonPointer);

    let retJson = mod.UTF8ToString(resultPointer);

    mod._free(resultPointer);

    return JSON.parse(retJson);
}