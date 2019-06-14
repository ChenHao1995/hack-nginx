import { routerConfig } from 'backbone-react'

const config: routerConfig = {
  components: {
    nginx: require('./index').default,
  },
  routes: {
    nginx: 'nginx',
  },
  onEnter: {
    nginx(step) {
      console.log('nginx route enter')
      return true
    },
  },
}

export default config
