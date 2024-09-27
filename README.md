# gzip-compressor

gzip-compressor is a command-line tool for compressing files in a build directory using Gzip compression. It's designed to be used as part of a build process for web projects, helping to reduce file sizes for faster content delivery.

## Features

- Recursively compresses files in a specified directory
- Configurable compression level
- Selectable file extensions for compression
- Preserves original files, creating compressed versions alongside them

## Installation

You have two options to use gzip-compressor:

### 1. Global Installation

To install the package globally, you need to have Node.js installed on your system. Then, you can install using npm:

```
npm install -g gzip-compressor
```

### 2. Using npx (No Installation Required)

If you prefer not to install the package globally, you can use `npx` to run it directly. This method requires no installation, but you still need to have Node.js installed on your system.

## Usage

### If Installed Globally

After global installation, you can run the tool from the command line:

```
gzip-compressor --path ./build --level 7 --extensions .html,.css,.js
```

Or using the short options:

```
gzip-compressor -p ./build -l 7 -e .html,.css,.js
```

### Using npx (Without Installation)

To use the tool with npx without installing it, run:

```
npx gzip-compressor --path ./build --level 7 --extensions .html,.css,.js
```

Or using the short options:

```
npx gzip-compressor -p ./build -l 7 -e .html,.css,.js
```

## Options

- `--path, -p`: (Required) Path to the build directory
  - Type: string
  - Description: The directory containing the files you want to compress

- `--level, -l`: (Optional) Gzip compression level
  - Type: number
  - Default: 9
  - Range: 1-9
  - Description: The compression level to use (1 = fastest, 9 = best compression)

- `--extensions, -e`: (Optional) File extensions to compress
  - Type: string
  - Default: ".html,.css,.js,.json,.svg"
  - Description: Comma-separated list of file extensions to include in compression

- `--help, -h`: Show help information

## Examples

1. Compress all default file types in the 'dist' folder with maximum compression:
   ```
   gzip-compressor --path ./dist
   ```
   or with npx:
   ```
   npx gzip-compressor --path ./dist
   ```

2. Compress only HTML and CSS files in the 'public' folder with fast compression:
   ```
   gzip-compressor --path ./public --level 1 --extensions .html,.css
   ```
   or with npx:
   ```
   npx gzip-compressor --path ./public --level 1 --extensions .html,.css
   ```

3. Compress all JavaScript files in the 'build' folder with medium compression:
   ```
   gzip-compressor -p ./build -l 5 -e .js
   ```
   or with npx:
   ```
   npx gzip-compressor -p ./build -l 5 -e .js
   ```

## How It Works

The tool performs the following steps:

1. Parses command-line arguments to get the build directory, compression level, and file extensions.
2. Recursively scans the specified directory for files.
3. For each file with a matching extension, it creates a Gzip-compressed version with a `.gz` extension.
4. Logs the compression progress and any errors encountered.

## Notes

- The original files are preserved; compressed versions are created alongside them.
- The tool uses the `zlib` module for compression, which is part of Node.js core.
- Errors during compression will be logged, and the process will exit with a non-zero status code.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT License](LICENSE)
