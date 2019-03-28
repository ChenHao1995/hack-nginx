import _ from 'underscore'
import { AxiosStatic } from 'axios'

declare global {
  const _: typeof _
  const axios: AxiosStatic

  interface Window {
    _: typeof _
    axios: AxiosStatic
  }
}
