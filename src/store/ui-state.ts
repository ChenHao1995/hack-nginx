import { Model } from 'backbone-react'

interface uiState {
  [key: string]: any
  loading: object
}

export class UiState extends Model {
  attributes: uiState = this.attributes
  defaults(): uiState {
    return {
      loading: {},
    }
  }
}

export default new UiState()
