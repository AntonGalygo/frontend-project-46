import _ from 'lodash';

const genDiff = (file1, file2) => {
  const key1 = Object.keys(file1);
  const key2 = Object.keys(file2);
  const keys = _.sortBy(_.union(key1, key2));
  let result = '';
  for (const key of keys) {
    if (Object.hasOwn(file1, key) && !Object.hasOwn(file2, key)) {
      result = result + `- ${key}: ${file1[key]}\n`;
    }
    if (Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      if (file1[key] === file2[key]) {
        result = result + `  ${key}: ${file1[key]}\n`;
      } else {
        result = result + `- ${key}: ${file1[key]}\n`;
        result = result + `+ ${key}: ${file2[key]}\n`;
      }
    }
    if (!Object.hasOwn(file1, key) && Object.hasOwn(file2, key)) {
      result = result + `+ ${key}: ${file2[key]}\n`;
    }
  }
  return result;
};

export default genDiff;
