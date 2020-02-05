/**
 * A top-level program to run microgrammars across files
 * 
 * This can be called from bash or powershell scripts.
 * Those are expected to do glob expansion, plus parameter parsing.
 * 
 * I hate node's process arguments, so leave that to something that does it better
 * (well, powershell is great at it) and expect them in env vars.
 * 
 * required:
 * MG_STRING=the microgrammar string
 * INPUT_PATH=an input filepath
 * 
 * optional:
 * ENCODING=file encoding, default UTF8
 */

import * as mg from "../index"
import * as fs from "fs"
import * as util from "util"

const usage = `mg <microgrammar string> <input file> [file...]`

/*
 * TODO: make this print to a different file descriptor if I can. Or else stderr.
 * Because this program outputs data for use by programs, and this output is for a human.
 */
function say(str: String) {
    console.log(str);
}

function outputData(data: any) {
    console.log(JSON.stringify(data), null, 2)
}

const mgString = process.env["MG_STRING"]
const files = [process.env["INPUT_PATH"]]

say(`Microgrammar: [${mgString}]`);


const microgrammar = mg.microgrammar(mgString as any);
say(`Files: [${files.join("],[")}]`);

async function findMatchesInFile(microgrammar: mg.Microgrammar<{}>, path: string) {
    const input = await util.promisify(fs.readFile)(path);
    const matches = microgrammar.matchReportIterator(input.toString(process.env["ENCODING"] || "UTF8"));
    for (const m of matches) {
        outputData(m.toValueStructure());
    }
}

findMatchesInFile(microgrammar as mg.Microgrammar<{}>, files[0]).catch(e => "failure")
