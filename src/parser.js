import jsYaml from 'js-yaml';
import readFile from './reader.js';

const parser = (file, type) => {
  switch (type) {
    case 'json':
      return JSON.parse(readFile(file));
    case 'yml':
    case 'yaml':
      return jsYaml.load(readFile(file));
    default:
      throw new Error(`Unknown type ${type}!`);
  }
};

export default parser;
