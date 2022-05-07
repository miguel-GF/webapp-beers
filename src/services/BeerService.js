import { api } from '../plugins/axiosConfig'
import store from '../store'

class BeerService {
  static async getBeers (endpoint, params) {
    const response = await api.get(endpoint, params)
    store.dispatch('getBeersAction', response.data)
    return response
  }
}

export default BeerService
