import readFile from './reader.js';

const parser = (file) => {
  return JSON.parse(readFile(file));
};

export default parser;
