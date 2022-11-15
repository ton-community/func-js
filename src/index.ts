import {base64Decode} from "./utils";

const CompilerModule = require('./wasmlib/funcfiftlib.js');
const {FuncFiftLibWasm} = require('./wasmlib/funcfiftlib.wasm.js')

// Prepare binary
const WasmBinary = base64Decode(FuncFiftLibWasm)

export type SourcesMap = { [filename: string]: string }

export type SourceResolver = (path: string) => string;

export const mapSourceResolver = (map: SourcesMap): SourceResolver => {
    return (path: string) => {
        if (path in map) {
            return map[path];
        }
        throw new Error('Cannot find source file ' + path);
    };
};

/*
 * CompilerConfig example:
 * {
 *      // Entry points of your project.
 *      // If your project has no includes you should provide all files to this array.
 *      // Else provide only main entry with all necessary includes.
 *      entryPoints: ["stdlib.fc", "main.fc", ...],
 *
 *      // All .fc source files from your project
 *      sources: {
 *          "stdlib.fc": "<stdlib code>",
 *          "contract1": "<contract1 code>",
 *          ...
 *      },
 *
 *      // FunC compiler optimization level
 *      optLevel: number of <0-2> (default is 2)
 * }
 *
 */
export type CompilerConfig = {
    entryPoints: string[],
    sources: SourcesMap | SourceResolver,
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

const copyToCString = (mod: any, str: string) => {
    const len = mod.lengthBytesUTF8(str) + 1;
    const ptr = mod._malloc(len);
    mod.stringToUTF8(str, ptr, len);
    return ptr;
}

const copyToCStringPtr = (mod: any, str: string, ptr: any) => {
    const allocated = copyToCString(mod, str);
    mod.setValue(ptr, allocated, '*');
    return allocated;
};

const copyFromCString = (mod: any, ptr: any) => {
    return mod.UTF8ToString(ptr);
};

export async function compilerVersion(): Promise<CompilerVersion> {
    const mod = await CompilerModule({ wasmBinary: WasmBinary });

    const versionJsonPointer = mod._version();
    const versionJson = copyFromCString(mod, versionJsonPointer);
    mod._free(versionJsonPointer);

    return JSON.parse(versionJson);
}

export async function compileFunc(compileConfig: CompilerConfig): Promise<CompileResult> {
    const resolver = typeof compileConfig.sources === 'function' ? compileConfig.sources : mapSourceResolver(compileConfig.sources);

    const entryWithNoSource = compileConfig.entryPoints.find(filename => {
        try {
            resolver(filename);
            return false;
        } catch (e) {
            return true;
        }
    });
    if (entryWithNoSource) {
        throw new Error(`The entry point ${entryWithNoSource} has not provided in sources.`)
    }

    const mod = await CompilerModule({ wasmBinary: WasmBinary });

    const allocatedPointers = [];

    const callbackPtr = mod.addFunction((_kind: any, _data: any, contents: any, error: any) => {
        const kind: string = copyFromCString(mod, _kind);
        const data: string = copyFromCString(mod, _data);
        if (kind === 'realpath') {
            allocatedPointers.push(copyToCStringPtr(mod, data, contents));
        } else if (kind === 'source') {
            try {
                const source = resolver(data);
                allocatedPointers.push(copyToCStringPtr(mod, source, contents));
            } catch (err) {
                const e = err as any;
                allocatedPointers.push(copyToCStringPtr(mod, 'message' in e ? e.message : e.toString(), error));
            }
        } else {
            allocatedPointers.push(copyToCStringPtr(mod, 'Unknown callback kind ' + kind, error));
        }
    }, 'viiii');

    const configStr = JSON.stringify({
        sources: compileConfig.entryPoints,
        optLevel: compileConfig.optLevel || 2
    });

    const configStrPointer = copyToCString(mod, configStr);
    allocatedPointers.push(configStrPointer);

    const resultPointer = mod._func_compile(configStrPointer, callbackPtr);
    allocatedPointers.push(resultPointer);
    const retJson = copyFromCString(mod, resultPointer);

    // Cleanup
    allocatedPointers.forEach(ptr => mod._free(ptr));
    mod.removeFunction(callbackPtr);

    return JSON.parse(retJson);
}