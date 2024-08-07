#!/usr/bin/env node
import { Command } from 'commander';
import getDifferent from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, option) => {
    const result = getDifferent(filepath1, filepath2, option.format);
    console.log(result);
  });

program.parse();
