import _ from 'lodash';

const getSpace = (depth, symbol) => {
  const space = '    ';
  if (!symbol) {
    return space.repeat(depth);
  }
  if (depth === 0 && !symbol) {
    return '';
  }
  return `${space.repeat(depth)}  ${symbol}`;
};

function stringify(value, level) {
  function iter(currentValue, depth) {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const lines = Object.entries(currentValue).map(([key, val]) => `${getSpace(depth + 1, '  ')}${key}: ${iter(val, depth + 1)}`);
    return ['{', ...lines, `${getSpace(depth + 1)}}`].join('\n');
  }
  return iter(value, level);
}

const getStylish = (tree) => {
  const iter = (object, depth) => {
    const result = object.map((key) => {
      switch (key.type) {
        case 'delete':
          return `${getSpace(depth, '- ')}${key.key}: ${stringify(key.value1, depth)}`;
        case 'add':
          return `${getSpace(depth, '+ ')}${key.key}: ${stringify(key.value2, depth)}`;
        case 'parent':
          return `${getSpace(depth, '  ')}${key.key}: ${iter(key.children, depth + 1)}`;
        case 'change':
          return [`${getSpace(depth, '- ')}${key.key}: ${stringify(key.value1, depth)}\n${getSpace(depth, '+ ')}${key.key}: ${stringify(key.value2, depth)}`];
        default:
          return `${getSpace(depth, '  ')}${key.key}: ${stringify(key.value1, depth)}`;
      }
    });
    return ['{', ...result, `${getSpace(depth)}}`].join('\n');
  };
  return iter(tree, 0);
};

export default getStylish;
