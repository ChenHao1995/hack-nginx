import { routerConfig } from 'backbone-react'

const config: routerConfig = {
  components: {
    demo: require('./index').default,
  },
  routes: {
    demo: 'demo',
  },
  onEnter: {
    demo(step) {
      console.log('demo route enter')
      return true
    },
  },
}

export default config
