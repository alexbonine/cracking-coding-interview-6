const { readdirSync, readFileSync } = require('fs');

const baseDir = 'chap-';

const getDashName = (str = '') => {
  return str.toLowerCase().replace(/ /g, '-');
};

const getCamelName = (str = '') => {
  return str.toLowerCase()
    .split(' ')
    .map((word, index) => index > 0 && word[0].toUpperCase() + word.slice(1) || word)
    .join('');
};

const getBaseFile = (str = '') => {
  const funcName = getCamelName(str);

  return `const runTests = require('../scripts/runTests');

const tests = [
  { args: [], expected: true },
  { args: [], expected: true },
  { args: [], expected: true },
];

const ${funcName} = () => {
  
};

runTests(${funcName}, tests);
`;
};

const getFullPath = (dirFound, problemNumber, problemName) => `${dirFound}/${problemNumber}-${getDashName(problemName)}.js`;

const findDir = (chapterNumber) => {
  const dir = readdirSync(process.cwd());
  return dir.find((file) => file.startsWith(`${baseDir}${chapterNumber}`));
};

const findFile = (chapter, problemNumber) => {
  const dir = readdirSync(chapter);
  return dir.find((file) => file.startsWith(`${problemNumber}-`));
};


module.exports = {
  findDir,
  findFile,
  getBaseFile,
  getDashName,
  getFullPath,
};