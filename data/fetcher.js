const API_URL = 'http://localhost:8000'

const checkError = (res) => {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res
}

const checkErrorJson = async (res) => {
  if (res.status === 200 || res.status === 201) {
    return res.json()
  }
  const err = new Error(String(res.status))
  err.status = res.status
  try {
    err.body = await res.json()
  } catch (_) {
    err.body = null
  }
  throw err
}

const catchError = (err) => {
  if (err.message === '401') {
    window.location.href = "/login"
    return
  }
  if (err.message === '404') {
    return null
  }
  throw err
}

export const fetchWithResponse = (resource, options) => fetch(`${API_URL}/${resource}`, options)
  .then(checkErrorJson)
  .catch(catchError)

export const fetchWithoutResponse = (resource, options) => fetch(`${API_URL}/${resource}`, options)
  .then(checkError)
  .catch(catchError)
