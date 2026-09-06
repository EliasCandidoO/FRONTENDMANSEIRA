import api from './api'

export function getGeneralFeed() {
  return api.get('/news')
}