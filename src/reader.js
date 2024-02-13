import * as fs from 'node:fs';
import path from 'node:path';
import cwd from 'node:process';

const reader = (fullPath) => fs.readFileSync(fullPath, 'UTF-8');

// console.log(reader('__fixtures__/file1.yml'));

export default reader;
