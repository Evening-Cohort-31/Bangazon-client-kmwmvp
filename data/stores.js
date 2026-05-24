import { fetchWithResponse, fetchWithoutResponse } from './fetcher'

export function getStores() {
  return fetchWithResponse('stores', {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function getStoreById(id) {
  return fetchWithResponse(`stores/${id}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export function addStore(store) {
  return fetchWithResponse(`stores`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(store)
  })
}

export function editStore(store) {
  return fetchWithoutResponse(`stores/${store.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(store)
  })
}

export function favoriteStore(storeId) {
  return fetchWithoutResponse(`profile/favoritestores`, {
    body: JSON.stringify({ store_id: storeId }),
    method: 'POST',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  })
}

export function unfavoriteStore(storeId) {
  return fetchWithoutResponse(`profile/favoritestores/${storeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
  })
}
