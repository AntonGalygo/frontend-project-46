import _ from 'lodash';
import parser from './parser.js';

export const getExtension = (filename) => {
  const result = filename.split('.');
  return result.at(-1);
};

// export const getDifferent = (filepath1, filepath2) => {
//   const dataFile1 = parser(filepath1, getExtension(filepath1));
//   const dataFile2 = parser(filepath2, getExtension(filepath2));
//   const keys1 = Object.keys(dataFile1);
//   const keys2 = Object.keys(dataFile2);
//   const keys = _.uniq([...keys1, ...keys2]);
//   keys.sort();
//   let result = '';
//   /* eslint-disable-next-line */
//   for (const key of keys) {
//     if (dataFile1[key] === dataFile2[key]) {
//       result += `  ${key}: ${dataFile1[key]}\n`;
//     }
//     if (_.has(dataFile1, key) && !_.has(dataFile2, key)) {
//       result += `- ${key}: ${dataFile1[key]}\n`;
//     }
//     if (!_.has(dataFile1, key) && _.has(dataFile2, key)) {
//       result += `+ ${key}: ${dataFile2[key]}\n`;
//     }
//     if (_.has(dataFile1, key) && _.has(dataFile2, key) && dataFile1[key] !== dataFile2[key]) {
//       result += `- ${key}: ${dataFile1[key]}\n+ ${key}: ${dataFile2[key]}\n`;
//     }
//   }
//   return `{\n${result}}`;
// };

const divCount = (div, num) => div.repeat(num);

export const getDifferent = (filepath1, filepath2) => {
  const obj1 = parser(filepath1, getExtension(filepath1));
  const obj2 = parser(filepath2, getExtension(filepath2));
};

const getDiffOfObjects = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
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
// console.log(getDiffOfObjects('__fixtures__/file1.json', '__fixtures__/file2.json'));
console.log(getDiffOfObjects(parser('__fixtures__/file1.json', getExtension('__fixtures__/file1.json')), parser('__fixtures__/file1.json', getExtension('__fixtures__/file1.json'))));
