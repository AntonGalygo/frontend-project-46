import _ from 'lodash';
import parser from './parser.js';

export const getExtension = (filename) => {
  const result = filename.split('.');
  return result.at(-1);
};

export const getDifferent = (filepath1, filepath2) => {
  const dataFile1 = parser(filepath1, getExtension(filepath1));
  const dataFile2 = parser(filepath2, getExtension(filepath2));
  const keys1 = Object.keys(dataFile1);
  const keys2 = Object.keys(dataFile2);
  const keys = _.uniq([...keys1, ...keys2]);
  keys.sort();
  let result = '';
  for (const key of keys) {
    if (dataFile1[key] === dataFile2[key]) {
      result += `  ${key}: ${dataFile1[key]}\n`;
    }
    if (_.has(dataFile1, key) && !_.has(dataFile2, key)) {
      result += `- ${key}: ${dataFile1[key]}\n`;
    }
    if (!_.has(dataFile1, key) && _.has(dataFile2, key)) {
      result += `+ ${key}: ${dataFile2[key]}\n`;
    }
    if (_.has(dataFile1, key) && _.has(dataFile2, key) && dataFile1[key] !== dataFile2[key]) {
      result += `- ${key}: ${dataFile1[key]}\n+ ${key}: ${dataFile2[key]}\n`;
    }
  }
  return `{\n${result}}`;
};
