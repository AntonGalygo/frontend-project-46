import * as fs from 'node:fs';
import path from 'node:path';
import cwd from 'node:process';

const reader = (file) => {
  const filepath = path.resolve(file);
  const result = fs.readFileSync(filepath);
  return result;
};

export default reader;
