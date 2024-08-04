import getPlain from './plain.js';
import getStylish from './stylish.js';

const formatter = (tree, format = 'stylish') => {
  if (format === 'stylish') {
    return getStylish(tree);
  }
  if (format === 'plain') {
    return getPlain(tree);
  }
  if (format === 'json') {
    return JSON.stringify(tree);
  }
  return new Error('Wrong format type');
};

export default formatter;
