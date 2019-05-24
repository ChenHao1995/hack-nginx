import _, { UnderscoreStatic } from 'underscore'
import { AxiosStatic } from 'axios'

declare global {
  const _: UnderscoreStatic
  const axios: AxiosStatic

  interface Window {
    _: UnderscoreStatic
    axios: AxiosStatic
    cache: any
  }
}
