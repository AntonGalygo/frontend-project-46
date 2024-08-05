import getPlain from './plain.js';
import getStylish from './stylish.js';

const formatter = (tree, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return getStylish(tree);
    case 'plain':
      return getPlain(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error('Wrong format type');
  }
};

export default formatter;
