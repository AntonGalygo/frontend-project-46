#!/usr/bin/env node
import { program } from 'commander';
import parser from '../src/parser.js';
import genDiff from '../src/diff.js';

program.name('gendiff').description('Compares two configuration files and shows a difference.').version('0.8.0');
program.option('-f, --format [type]', 'output format').argument('<filepath1>').argument('<filepath2>');
program.action((filepath, filepath2) => {
  const parsePath1 = parser(filepath);
  const parsePath2 = parser(filepath2);
  console.log(genDiff(parsePath1, parsePath2));
});
program.parse();
