import readFile from './reader.js';

const parser = (file) => JSON.parse(readFile(file));

export default parser;
