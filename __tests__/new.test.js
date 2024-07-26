import { fileURLToPath } from 'url';
import path from 'path';
import getDifferent from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('different check', () => {
  const result = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';
  expect(getDifferent(getFixturePath('file1.json'), getFixturePath('file2.json')).toEqual(result));
});
