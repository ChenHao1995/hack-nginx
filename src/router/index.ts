// 路由的总表, 添加新路由时请确保添加在404页面之前
import { createRouter } from 'backbone-react'
import helper from './helper'

const { modules } = require('./config.json')
const routers = modules.map(module => require(`../module/${module}/router`).default)

export default createRouter(routers, helper)
