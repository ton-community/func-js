const CompilerModule = require('./wasmlib/funcfiftlib.js');
const {FuncFiftLibWasm} = require('./wasmlib/funcfiftlib.wasm.js')
import { glob } from "glob";
import { readFileSync } from 'fs';
import { basename } from 'path';

/*
 * CompilerConfig example:
 * {
 *      // Entry points of your project.
 *      // If your project has no includes you should provide all files to this array.
 *      // Else provide only main contract with all necessary includes.
 *      entryPoints: ["stdlib.fc", "contract1", ...],
 *      // All sources from your project
 *      sources: {
 *          "stdlib.fc": "<stdlib code>",
 *          "contract1": "<contract1 code>",
 *          ...
 *      },
 *      // cwdPattern is a glob pattern to find all sources in your project.
 *      // If you provide this parameter, sources will be ignored.
 *      cwdPattern: './test/contracts/**
 *      // FunC compiler optimization level
 *      optLevel: number of <0-2> (default is 2)
 * }
 *
 */
export type SourcesMap = { [filename: string]: string }

export type CompilerConfig = {
    entryPoints: string[],
    sources?: SourcesMap,
    cwdPattern?: string,
    optLevel?: number
};

export type SuccessResult = {
    status: "ok",
    codeBoc: string,
    fiftCode: string,
    warnings: string
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
    let mod = await CompilerModule({ wasmBinary: FuncFiftLibWasm });

    let versionJsonPointer = mod._version();
    let versionJson = mod.UTF8ToString(versionJsonPointer);
    mod._free(versionJsonPointer);

    return JSON.parse(versionJson);
}


function cwdToSourcesMap(cwd: string): SourcesMap {
    let files = glob.sync(cwd);

    let result: SourcesMap = {};

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filename = basename(file);
        result[filename] = readFileSync(file, { encoding: "utf-8" });
    }

    return result;
}

export async function compileFunc(compileConfig: CompilerConfig): Promise<CompileResult> {
    let sources: SourcesMap = {};
    if(compileConfig.cwdPattern) {
        sources = cwdToSourcesMap(compileConfig.cwdPattern);
    } else if(compileConfig.sources) {
        sources = compileConfig.sources;
    }

    let entryWithNoSource = compileConfig.entryPoints.find( filename => typeof sources[filename] !== "string");
    if (entryWithNoSource) {
        throw new Error(`The entry point ${entryWithNoSource} has not provided in sources.`);
    }

    let mod = await CompilerModule({ wasmBinary: FuncFiftLibWasm });

    // Write sources to virtual FS
    for (let fileName in sources) {
        let source = sources[fileName];
        mod.FS.writeFile(fileName, source);
    }

    let configStr = JSON.stringify({
        sources: compileConfig.entryPoints,
        optLevel: compileConfig.optLevel || 2
    });

    let configStrPointer = mod._malloc(configStr.length + 1);
    mod.stringToUTF8(configStr, configStrPointer, configStr.length + 1);

    let resultPointer = mod._func_compile(configStrPointer);
    let retJson = mod.UTF8ToString(resultPointer);

    // Cleanup
    mod._free(resultPointer);
    mod._free(configStrPointer);
    mod = null;

    return JSON.parse(retJson);
}