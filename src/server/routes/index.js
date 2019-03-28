/**
 * 自定义路由
 */

import express from 'express'
import _ from 'underscore'

const router = express.Router()
const routes = {}

_.each(routes, (handle, path) => {
  router.get(path, handle)
})

export default router
