const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const backendRoot = __dirname;
const sourceRoot = path.join(backendRoot, 'src', 'main', 'java');
const outputRoot = path.join(backendRoot, 'target', 'classes');

function findJavaFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? findJavaFiles(entryPath) : entry.name.endsWith('.java') ? [entryPath] : [];
  });
}

fs.mkdirSync(outputRoot, { recursive: true });
const sourceFiles = findJavaFiles(sourceRoot);

if (sourceFiles.length === 0) {
  console.error('No Java source files were found.');
  process.exit(1);
}

const compile = spawnSync('javac', ['-d', outputRoot, ...sourceFiles], { stdio: 'inherit' });
if (compile.error) {
  console.error('Could not find javac. Install Java JDK 17+ and add it to PATH.');
  process.exit(1);
}
if (compile.status !== 0) {
  process.exit(compile.status ?? 1);
}

const run = spawnSync('java', ['-cp', outputRoot, 'Main'], { stdio: 'inherit' });
if (run.error) {
  console.error('Could not find java. Install Java JDK 17+ and add it to PATH.');
  process.exit(1);
}
process.exit(run.status ?? 1);
