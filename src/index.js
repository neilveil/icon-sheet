#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const svgtofont = require('svgtofont')

const config = {
  iconsDir: './icons',
  ttfPath: './icon-sheet.ttf',
  stylesPath: './icon-sheet.css',
  woffPath: '',
  woff2Path: ''
}

process.argv.slice(2).forEach(x => {
  if (x.startsWith('--')) {
    x = x.slice(2)
    const [key, value] = x.split('=')
    if (Object.keys(config).includes(key)) config[key] = value
  }
})

const iconsDir = path.resolve(config.iconsDir)
const ttfPath = path.resolve(config.ttfPath)
const woffPath = path.resolve(config.woffPath)
const woff2Path = path.resolve(config.woff2Path)
const stylesPath = path.resolve(config.stylesPath)

if (!fs.existsSync(iconsDir) || fs.statSync(iconsDir).isFile()) {
  console.log('icon-sheet: Icon directory not found!')
  process.exit(1)
}

const iconsCount = fs.readdirSync(iconsDir).filter(x => x.endsWith('.svg')).length

if (!iconsCount) console.log('icon-sheet: No icons found in the icons directory!')
else {
  console.log(`icon-sheet: Generating font from ${iconsCount} icons..`)

  const version = Date.now().toString()

  const tmpDir = path.resolve(version)

  svgtofont({
    src: iconsDir,
    dist: tmpDir,
    fontName: 'icon-sheet',
    emptyDist: true,
    useNameAsUnicode: true,
    svgicons2svgfont: {
      fontHeight: 1000,
      normalize: true,
      fontWeight: 400
    },
    css: false,
    log: false
  }).then(() => {
    fs.mkdirSync(path.dirname(ttfPath), { recursive: true })
    fs.copyFileSync(path.resolve(tmpDir, 'icon-sheet.ttf'), path.resolve(ttfPath))

    if (config.woffPath) {
      fs.mkdirSync(path.dirname(woffPath), { recursive: true })
      fs.copyFileSync(path.resolve(tmpDir, 'icon-sheet.woff'), path.resolve(woffPath))
    }

    if (config.woff2Path) {
      fs.mkdirSync(path.dirname(woff2Path), { recursive: true })
      fs.copyFileSync(path.resolve(tmpDir, 'icon-sheet.woff2'), path.resolve(woff2Path))
    }

    fs.rmSync(tmpDir, { recursive: true })

    fs.mkdirSync(path.dirname(stylesPath), { recursive: true })
    fs.writeFileSync(
      stylesPath,
      `
@font-face {
  font-family: 'icon-sheet';
  src: url('/icon-sheet.ttf?t=${version}') format('truetype'), url('/icon-sheet.woff?t=${version}') format('woff'), url('/icon-sheet.woff2?t=${version}') format('woff2');
}

.icon,
.icon-sheet {
  font-family: 'icon-sheet' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
        `.trim()
    )

    console.log('icon-sheet: Icon sheet generated!')
  })
}
