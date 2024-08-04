const getString = (value) => {
  switch (typeof value) {
    case 'object':
      return value == null ? value : '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
};

const data = {
  added: 'was added with value:',
  deleted: 'was removed',
  changed: 'was updated. From',
};

const getPlain = (tree) => {
  function iter(object, path) {
    const result = object.map((key) => {
      const fullKey = `${path}${key.key}`;
      if (key.type === 'delete') {
        return `Property '${fullKey}' ${data.deleted}`;
      }
      if (key.type === 'add') {
        return `Property '${fullKey}' ${data.added} ${getString(key.value2)}`;
      }
      if (key.type === 'parent') {
        return iter(key.children, `${fullKey}.`);
      }
      if (key.type === 'change') {
        return `Property '${fullKey}' ${data.changed} ${getString(key.value1)} to ${getString(key.value2)}`;
      }
      return null;
    });
    return result.filter((item) => item != null).join('\n');
  }
  return iter(tree, '');
};

export default getPlain;
