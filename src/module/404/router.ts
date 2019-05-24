import { routerConfig } from 'backbone-react'

const config: routerConfig = {
  components: {
    notFound: require('./index').default,
  },
  routes: {
    '404': 'notFound',
    '*notfound': 'notFound',
  },
}

export default config
