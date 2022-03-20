const path = require("path");
const fs = require("fs");

const targets = [
  "store-pro-angular/store-pro.ts",
  "store-pro-react/src/store-pro.ts",
];

/** @type {string[]} */
const args = process.argv.slice(2);

if (args[0] === "switch") {
  const m = args[1] === "-t" ? "store-pro-test" : "store-pro";
  const string = `// this is a generated file please DO NOT EDIT MANUALLY\n// use tools.js instead\nexport * from "${m}"`;
  targets.forEach((target) => {
    fs.writeFileSync(path.join(__dirname, target), string);
  });
}
