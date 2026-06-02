import { fetchWithResponse } from './fetcher'

export function getRecommendations() {
  return fetchWithResponse(`recommendations`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function getRecommendedToMe() {
  return fetchWithResponse(`recommendations?recommended_to=true`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}


export function recommendProduct(productId, username) {
  return fetchWithResponse(`recommendations`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({product: productId, username})
  })
}