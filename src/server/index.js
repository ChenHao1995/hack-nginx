import './server-global'
import path from 'path'
import _ from 'underscore'
import express from 'express'
import { createSsrHtml } from './util'
import routes from './routes'

const serveStatic = require('serve-static')
const pages = require('../../config/pages')

const serve = serveStatic('build', {
  maxAge: '1y',
  setHeaders: setCustomCacheControl,
})

const port = process.env.PORT || 8080
const app = express()

app.use(require('cookie-parser')())

// 对配置的页面生成相应路由
_.each(pages, page => {
  if (!page.route) return
  if (page.filename) {
    page.filePath = path.resolve('build/' + page.filename)
  }

  if (page.componentPath) {
    page.Component = require('src/module/' + page.componentPath).default
  }
  app.get(page.route, async function(req, res) {
    if (page.ssr) {
      const html = await createSsrHtml({
        req,
        Component: page.Component,
        path: page.filePath,
      })
      res.send(html)
      return
    }
    res.sendFile(page.filePath)
  })
})

// 应用自定义路由
app.use('/', routes)

app
  .use(require('compression')())
  .use(require('connect-history-api-fallback')())
  .use(serve)
  .listen(port, () => {
    // eslint-disable-next-line
    console.log('listening on: ' + port)
  })

function setCustomCacheControl(res, path) {
  // 开发环境所有文件都不缓存
  if (process.env.APP_ENV === 'development') {
    res.setHeader('Cache-Control', 'no-store, must-revalidate')
    return
  }
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // 允许浏览器缓存html页面，但必须在使用前验证旧资源状态，并且不可使用过期资源
    res.setHeader('Cache-Control', 'no-store, must-revalidate')
  }
}
