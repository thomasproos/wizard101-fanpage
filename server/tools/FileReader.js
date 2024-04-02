const fs = require('fs/promises');

/** ValidatePath checks that a path exists
 * 
 * @param {string} path 
 * @returns {boolean} true if path exists
 */
async function validatePath(path) {
  try {
    await fs.access(path);
    return true;
  } catch(err) {
    console.error(err.message);
    return false;
  }
}

/** ValidateFile checks that the path leads to a file
 * 
 * @param {string} path to file 
 * @returns {boolean} true if path leads to file
 */
async function validateFile(path) {
  try {
    const file = await fs.stat(path);
    return file.isFile();
  } catch(err) {
    console.error(err.message);
    return false;
  }
}

/** ReadFile reads the content of a file and returns a string representation
 * 
 * @param {string} path to file to read
 * @returns {string} Content from a file
 */
async function readFile(path) {
  try {
    if (await validatePath(path)) {
      if (await validateFile(path)) {
        const data = await fs.readFile(path, 'utf-8');
        return data;
      }
    }
    return `Could not read file at ${path}`;
  } catch(err) {
    console.error(err.message);
    return `Could not read file at ${path}`;
  }
}

module.exports = readFile;