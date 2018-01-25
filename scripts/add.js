const { existsSync, mkdirSync, writeFileSync } = require('fs');
const { findDir, getBaseFile, getDashName, getFullPath } = require('./helpers');
const args = process.argv.slice(2);

/* Add null for optional params */
if (args.length === 3) {
  args.splice(1, 0, null);
}

const chapterNumber = args[0];
const chapterName = args[1];
const problemNumber = args[2];
const problemName = args[3];

/* Error check params */
if (args.length !== 4) {
  console.log('Error: missing params');
  return 0;
} else if (typeof parseInt(chapterNumber, 10) !== 'number') {
  console.log('Error: chapter number must be number');
  return 0;
} else if (chapterName && typeof chapterName !== 'string') {
  console.log('Error: chapter name must be string');
  return 0;
} else if (typeof parseInt(problemNumber, 10) !== 'number') {
  console.log('Error: problem number must be number');
  return 0;
} else if (typeof problemName !== 'string') {
  console.log('Error: problem name must be string');
  return 0;
}

/* See if chapter exists and if not create it */
let dirFound = findDir(chapterNumber);
if (!dirFound && !chapterName) {
  console.log('Error: no directory name given');
  return 0;
} else if (!dirFound) {
  const name = getDashName(chapterName);
  dirFound = `chap-${chapterNumber}-${name}`;
  mkdirSync(dirFound);
}

/* Create new file */
const newFile = getFullPath(dirFound, problemNumber, problemName);

if (existsSync(newFile)) {
  console.log('Error: File already exists');
  return 0;
}

writeFileSync(newFile, getBaseFile(problemName));


