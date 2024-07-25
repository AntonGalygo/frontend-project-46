import path from 'path';
import fs from 'fs';
import process from 'node:process';

const readFile = (filePath) => {
  const dirName = process.cwd(filePath);
  const fullPath = path.resolve(dirName, filePath);
  return fs.readFileSync(fullPath, 'utf-8');
};

export default readFile;
