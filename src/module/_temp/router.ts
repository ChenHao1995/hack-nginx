import { routerConfig } from 'backbone-react'

const config: routerConfig = {
  components: {
    temp: require('./index').default,
  },
  routes: {
    temp: 'temp',
  },
  onEnter: {
    temp(step) {
      console.log('temp enter')
    },
  },
}

export default config
