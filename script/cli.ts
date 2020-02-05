/**
 * A top-level program to run microgrammars across files
 * 
 * This can be called from bash or powershell scripts
 */

import * as mg from "../index"

const usage = `mg <microgrammar string> <input file> [file...]`

if (process.argv.length < 3) {
    console.log(usage)
}

const [nodeExecutable, thisScript, mgString, ...files] = process.argv

console.log(`Microgrammar: [${mgString}]`);

console.log(`Files: [${files.join("],[")}]`)