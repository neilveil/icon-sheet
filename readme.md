# Icon Sheet

[![Downloads](https://img.shields.io/npm/dm/icon-sheet.svg)](https://www.npmjs.com/package/icon-sheet) [![Version](https://img.shields.io/npm/v/icon-sheet.svg)](https://www.npmjs.com/package/icon-sheet)

Effortlessly Generate Icons from SVG files for ReactJS, VueJS, Angular, and Front-end Projects, Empowering Your UI Development.

## Why Icon Sheet?

- Light-weight
- Flexible
- Simple to use

With Icon-Sheet, you can seamlessly integrate custom icons into your web applications, enhancing user experience and visual appeal. Say goodbye to the hassle of manual icon creation and hello to a streamlined development process.

Whether you're building a dynamic web application or a responsive website, Icon-Sheet provides a straightforward solution for implementing icons that align perfectly with your design vision. Elevate your front-end projects with this powerful tool and experience the difference.

## Installation

```bash
npm install icon-sheet
```

## Setup

Put all your `.svg` in `icons` directory at the root of your project.

In your `package.json`` file, add a script:

```json

"scripts": {
  "icon-sheet": "icon-sheet"
},

```

Then run the command

```bash
npm run icon-sheet
```

Arguments

- `--iconsDir`: SVG icons directory. (Default: `icons`)
- `--ttfPath`: Generated TTF font path. (Default: `icon-sheet.ttf`)
- `--woffPath`: Generated WOFF font path.
- `--woff2Path`: Generated WOFF2 font path.
- `--stylesPath`: Generated styles path (Default: `icon-sheet.css`)

## Usage

```html
..

<head>
  ..
  <link rel="stylesheet" href="/icon-sheet.css" />
  ..
</head>

..
<span class="icon">my_icon</span>
..
```

Icon name is same as the svg file name, `icons/my_icon.svg`.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](./license.txt).

## Developer

Developed & maintained by [neilveil](https://github.com/neilveil).
