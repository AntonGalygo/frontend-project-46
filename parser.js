import * as fs from 'node:fs';
import path from 'node:path';

const parser = (file) => {
  const filepath = path.resolve(file);
  const result = fs.readFileSync(filepath);
  return JSON.parse(result);
};

export default parser;
