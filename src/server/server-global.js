import jsdom from 'jsdom'

const { JSDOM } = jsdom
const { window } = new JSDOM(`...`)
const { document } = window
const _ = require('underscore')

global.window = global
_.extend(global.window, {
  isSsr: true,
})

global.document = document

require('ignore-styles')
