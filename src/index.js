import parser from './parser.js';
import formatter from './formatters/index.js';
import getDiffOfObjects from './compareObjects.js';

const getExtension = (filename) => {
  const result = filename.split('.');
  return result.at(-1);
};

const getDifferent = (filepath1, filepath2, format) => {
  const obj1 = parser(filepath1, getExtension(filepath1));
  const obj2 = parser(filepath2, getExtension(filepath2));
  return formatter(getDiffOfObjects(obj1, obj2), format);
};

export default getDifferent;
