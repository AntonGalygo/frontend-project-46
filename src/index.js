import _ from 'lodash';
import parser from './parser.js';
import formatter from './formatters/index.js';

const getExtension = (filename) => {
  const result = filename.split('.');
  return result.at(-1);
};

const getDiffOfObjects = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.uniq([...keys1, ...keys2]));
  const result = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj2, key)) {
      return {
        type: 'delete',
        key,
        value1,
      };
    }
    if (!_.has(obj1, key)) {
      return {
        type: 'add',
        key,
        value2,
      };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        type: 'parent',
        key,
        children: getDiffOfObjects(value1, value2),
      };
    }
    if (value1 !== value2) {
      return {
        type: 'change',
        key,
        value1,
        value2,
      };
    }
    return {
      type: 'unchange',
      key,
      value1,
    };
  });
  return result;
};

const getDifferent = (filepath1, filepath2, format) => {
  const obj1 = parser(filepath1, getExtension(filepath1));
  const obj2 = parser(filepath2, getExtension(filepath2));
  return formatter(getDiffOfObjects(obj1, obj2), format);
};

export default getDifferent;
