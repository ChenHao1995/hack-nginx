/**
 * 该文件会被 webpack 配置文件引用，所以无法在此文件内引入需要被 webpack 编译的文件
 * 例如 require('src/App')
 *
 * 对需要 SSR 的页面，必须有一个指定的组件，用于在 server 端生成页面
 * 由于 webpack 对动态依赖解析的限制，SSR 指定的组件必须在 src/module 目录下
 * componentPath 是相对于 src/module 的相对路径
 */

const fs = require('fs')
const path = require('path')

let pages = {
  index: {
    entry: path.resolve('src/index.tsx'),
    template: path.resolve('public/index.html'),
    filename: 'index.html',
    title: 'React APP',
    route: '/',
    ssr: true,
    componentPath: 'App.tsx',
  },
}

const targetEntry = process.env.npm_config_target || ''
const targetEntries = targetEntry.split(',')
const staticPages = generateStaticPage('src/static-page')

Object.assign(pages, staticPages)

if (targetEntry) {
  let targetPages = {}
  targetEntries.forEach(entry => {
    if (pages[entry]) targetPages[entry] = pages[entry]
  })
  pages = targetPages
}

module.exports = pages

function generateStaticPage(dirPath) {
  if (!fs.existsSync(dirPath)) return {}
  const dirs = fs.readdirSync(resolve(dirPath))
  const pages = {}

  dirs.forEach(item => {
    const itemPath = `${dirPath}/${item}`
    const itemStat = fs.lstatSync(resolve(itemPath))

    if (item === 'tmp') return

    if (itemStat.isDirectory()) {
      pages[item] = {
        entry: resolve(itemPath),
        template: getStaticPageTemplate(item, itemPath),
        filename: 'page/static/' + item + '.html',
        static: true,
        route: '/page/static/' + item,
        path,
      }
    }
  })
  return pages
}

function getStaticPageTemplate(name, path) {
  const dirs = fs.readdirSync(resolve(path))
  const hasHtml = dirs.indexOf('index.html') > -1
  // const isMobilePage = /m-/.test(name)

  if (hasHtml) return resolve(`${path}/index.html`)
  // if (isMobilePage) return resolve('public/mobile.html')
  return resolve('public/index.html')
}

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
