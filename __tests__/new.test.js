import { fileURLToPath } from 'url';
import path from 'path';
import getDifferent from '../src/index.js';
import readFile from '../src/reader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('different check', () => {
  const result = readFile('__fixtures__/plain.txt');
  expect(getDifferent(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(result);
});
