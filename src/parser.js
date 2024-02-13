import reader from './reader.js';
import yaml from 'js-yaml';
import path from 'path';

const extensionFile = (file) => {
  const result = path.extname(file);
  return result;
};

const parser = (file) => {
  const result = reader(file);
  if (extensionFile(file) === '.json') {
    return JSON.parse(result);
  }
  if (extensionFile(file) === '.yml' || extensionFile(file) === '.yaml') {
    return yaml.load(result);
  }
};

export default parser;
