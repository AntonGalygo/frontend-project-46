import reader from './reader.js';

const parser = (file) => {
  const result = reader(file);
  return JSON.parse(result);
};

export default parser;
