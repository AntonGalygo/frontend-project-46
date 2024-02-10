import { test, expect } from '@jest/globals';
import genDiff from '../src/diff.js';

test('check', () => {
  expect(genDiff({ numb: 1 }, { numb: 1 })).toEqual('  numb: 1\n');
  expect(genDiff({ numb: 1, a: 'Alisa' }, { numb: 1, b: true })).toEqual('- a: Alisa\n+ b: true\n  numb: 1\n');
});
