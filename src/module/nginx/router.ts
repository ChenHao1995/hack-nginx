import { routerConfig } from 'backbone-react'
import Nginxs from './model'

const config: routerConfig = {
  components: {
    nginx: require('./index').default,
  },
  routes: {
    nginx: 'nginx',
  },
  onEnter: {
    nginx(step) {
      Nginxs.getNginxList()
      return true
    },
  },
}

export default config
