const { existsSync, mkdirSync, writeFileSync } = require('fs');
const { findDir, findFile, getBaseFile, getDashName, getFullPath } = require('./helpers');
const args = process.argv.slice(2);

const chapterNumber = args[0];
const problemNumber = args[1];

/* Error check params */
if (args.length !== 2) {
  console.log('Error: two params required');
  return 0;
} else if (typeof parseInt(chapterNumber, 10) !== 'number') {
  console.log('Error: chapter number must be number');
  return 0;
} else if (typeof parseInt(problemNumber, 10) !== 'number') {
  console.log('Error: problem number must be number');
  return 0;
}

/* See if chapter and problem exists */
let dirFound = findDir(chapterNumber);
let fileFound = findFile(dirFound, problemNumber);
const testFile = `${dirFound}/${fileFound}`;


if (!dirFound || !fileFound || !existsSync(testFile)) {
  console.log('Error: locating file');
  return 0;
}

require(`${process.cwd()}/${testFile}`);
