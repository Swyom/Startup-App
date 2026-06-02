const fs = require("fs");
const glob = require("glob"); // Note: glob might not be installed, better to use fs.readdirSync recursively
const path = require("path");

function getFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = dir + "/" + file;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, filesList);
    } else {
      if (name.endsWith(".js")) {
        filesList.push(name);
      }
    }
  }
  return filesList;
}

const files = getFiles("./screens");
files.push("./App.js");

for (const file of files) {
  let content = fs.readFileSync(file, "utf8");
  // Remove block comments
  content = content.replace(/\/\*[\s\S]*?\*\//g, "");
  // Remove line comments, avoiding URLs
  content = content.replace(/(^|\s)\/\/.*/g, "");
  // Remove React Native JSX comments {/* ... */}
  content = content.replace(/\{(\s*)\/\*[\s\S]*?\*\/(\s*)\}/g, "");

  fs.writeFileSync(file, content, "utf8");
}
