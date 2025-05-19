#!/usr/bin/env node
import arg from 'arg';
import { compileFunc, compilerVersion } from '.';
import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const main = async () => {
    const args = arg({
        '--version': Boolean,
        '--help': Boolean,
        '--require-version': String,
        '--artifact': String,
        '--boc': String,
        '--boc-hex': String,
        '--boc-base64': String,
        '--fift': String,
        '--cwd': String,
        '--verbose': Boolean,

        '-v': '--version',
        '-h': '--help',
        '-C': '--cwd',
    });

    if (args['--help']) {
        console.log(`Usage: func-js [OPTIONS] targets

targets: One or more FunC source files to compile

Options:
  -h, --help                   Show this help message and exit
  -v, --version                Show compiler version and exit
  -C, --cwd <path>             Use <path> as the working directory (useful in npm scripts)
  --require-version <version>  Enforce a specific FunC compiler version
  --verbose                    Enable verbose output

Output options:
  --artifact <path>            Write full JSON artifact (BoC, Fift, etc.) to the specified file
  --boc <path>                 Write BoC binary to the specified file
  --boc-hex <path>             Write BoC as hex to the specified file. Use "" to output to the console
  --boc-base64 <path>          Write BoC as base64 to the specified file. Use "" to output to the console
  --fift <path>                Write Fift code to the specified file. Use "" to output to the console
`);
        process.exit(0);
    }

    const verbose = args['--verbose'] ?? false;
    const verboseLog = (message: string) => verbose && console.log(message);

    const v = await compilerVersion();

    if (args['--require-version'] !== undefined && v.funcVersion !== args['--require-version']) {
        console.error(`Error: Required FunC version "${args['--require-version']}", but found "${v.funcVersion}"`);
        process.exit(1);
    }

    if (args['--version']) {
        console.log(`FunC v${v.funcVersion}`);
        process.exit(0);
    }

    if (args._.length === 0) {
        console.error('Error: No target files specified. Use --help to see available options.');
        process.exit(1);
    }

    verboseLog(`Using FunC compiler v${v.funcVersion}`);

    const basePath = args['--cwd'];
    const pathResolver = basePath === undefined
        ? (p: string) => p
        : (p: string) => path.join(basePath, p);

    const cr = await compileFunc({
        targets: args._,
        sources: (reqPath: string) => readFileSync(pathResolver(reqPath)).toString(),
    });

    if (cr.status === 'error') {
        console.error(cr.message);
        process.exit(1);
    }

    let hasOutput = false;
    verboseLog('Compilation successful.');

    const jsonArtifactOutputFilePath = args['--artifact'];
    if (jsonArtifactOutputFilePath !== undefined) {
        writeFileSync(jsonArtifactOutputFilePath, JSON.stringify({
            artifactVersion: 1,
            version: v.funcVersion,
            sources: cr.snapshot,
            codeBoc: cr.codeBoc,
            fiftCode: cr.fiftCode,
        }));
        verboseLog(`Compilation artifact written to "${jsonArtifactOutputFilePath}"`);
        hasOutput = true;
    }

    const bocBinaryOutputFilePath = args['--boc'];
    if (bocBinaryOutputFilePath !== undefined) {
        writeFileSync(bocBinaryOutputFilePath, Buffer.from(cr.codeBoc, 'base64'));
        verboseLog(`BoC binary written to "${bocBinaryOutputFilePath}"`);
        hasOutput = true;
    }

    const bocBase64 = cr.codeBoc;

    const bocHexOutputFilePath = args['--boc-hex']?.trim();
    if (bocHexOutputFilePath != undefined) {
        const bocHex = Buffer.from(bocBase64, 'base64').toString('hex');
        if (bocHexOutputFilePath) {
            writeFileSync(bocHexOutputFilePath, bocHex);
            verboseLog(`BoC (hex) written to "${bocHexOutputFilePath}"`);
        } else {
            console.log(bocHex);
        }
        hasOutput = true;
    }

    const bocBase64OutputFilePath = args['--boc-base64']?.trim();
    if (bocBase64OutputFilePath != undefined) {
        if (bocBase64OutputFilePath) {
            writeFileSync(bocBase64OutputFilePath, bocBase64);
            verboseLog(`BoC (base64) written to "${bocBase64OutputFilePath}"`);
        } else {
            console.log(bocBase64);
        }
        hasOutput = true;
    }

    const fiftCodeOutputFilePath = args['--fift']?.trim();
    if (fiftCodeOutputFilePath != undefined) {
        const fiftCode = cr.fiftCode;
        if (fiftCodeOutputFilePath) {
            writeFileSync(fiftCodeOutputFilePath, fiftCode);
            verboseLog(`Fift code written to "${fiftCodeOutputFilePath}"`);
        } else {
            console.log(fiftCode);
        }
        hasOutput = true;
    }

    if (!hasOutput) {
        console.warn('Warning: No output options specified. Use --help to see available options.');
    }
};

main();