#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const yargs = require('yargs');

const argv = yargs
  .option('path', {
    alias: 'p',
    description: 'Path to the build directory',
    type: 'string',
    demandOption: true
  })
  .option('level', {
    alias: 'l',
    description: 'Gzip compression level (1-9)',
    type: 'number',
    default: 9
  })
  .option('extensions', {
    alias: 'e',
    description: 'File extensions to compress (comma-separated)',
    type: 'string',
    default: '.html,.css,.js,.json,.svg'
  })
  .help()
  .alias('help', 'h')
  .argv;

const buildDir = argv.path;
const gzipOptions = { level: argv.level };
const extensions = argv.extensions.split(',').map(ext => ext.startsWith('.') ? ext : `.${ext}`);

function compressFile(filePath) {
  const gzip = zlib.createGzip(gzipOptions);
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(`${filePath}.gz`);

  return new Promise((resolve, reject) => {
    input.pipe(gzip).pipe(output)
      .on('finish', () => {
        console.log(`Compressed: ${filePath}`);
        resolve();
      })
      .on('error', reject);
  });
}

async function compressDirectory(directory) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await compressDirectory(filePath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        await compressFile(filePath);
      }
    }
  }
}

console.log(`Starting compression of ${buildDir}`);
console.log(`Compression level: ${gzipOptions.level}`);
console.log(`File extensions: ${extensions.join(', ')}`);

compressDirectory(buildDir)
  .then(() => console.log('Compression complete'))
  .catch((error) => {
    console.error('Compression failed:', error);
    process.exit(1);
  });