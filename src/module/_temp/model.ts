import { Model, Collection } from 'backbone-react'

interface storeInfo {
  [key: string]: any
}

export class Store extends Model {
  attributes: storeInfo = this.attributes
  defaults(): storeInfo {
    return {}
  }
}

export class Stores extends Collection<Store> {
  model = Store
}

export default new Stores()
