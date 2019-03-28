import React from 'react'
import { renderToString } from 'react-dom/server'
import fs from 'fs'
import path from 'path'

export async function createSsrHtml(opts) {
  const { Component, path, extraProps = {}, useCache = true, req } = opts
  const query = req.query
  const useSsr = query.ssr !== 'off'
  const SsrComponent = useSsr ? Component : () => null
  const cachePath = `${path}.cache`

  // 存在缓存的该语言html文件，直接返回
  if (useCache && fs.existsSync(cachePath)) {
    return fs.readFileSync(cachePath, 'utf8')
  }

  const appString = renderToString(<SsrComponent {...extraProps} />)
  const data = { extraProps }

  let htmlStr = fs.readFileSync(path, 'utf8')

  htmlStr = htmlStr
    .replace('<div id="app-root">', `<div id="app-root">${appString}`)
    .replace(
      `window.__APP_INIT_DATA__`,
      `window.__APP_INIT_DATA__ = ${require('htmlescape')(data)}`
    )

  // 异步缓存生成的页面
  if (useCache && useSsr) {
    fs.writeFile(cachePath, htmlStr, 'utf8', function() {})
  }
  return htmlStr
}

export function resolve(dir) {
  return path.resolve(__dirname, '../../../', dir)
}

export const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
