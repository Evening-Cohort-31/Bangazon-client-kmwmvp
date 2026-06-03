const API_URL = 'http://localhost:8000'

const checkError = (res) => {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res
}

const checkErrorJson = async (res) => {

  // Let any of the 2xx status codes pass through
  // The 2xx code series always has res.ok set to true
  if (res.ok) {
    // If the status code is 204 No Content, return null instead of trying to parse JSON
    if (res.status === 204) {
      // No content, return null
      return null
    }
    return res.json()
  }

  const err = new Error(String(res.status))

  err.status = res.status

  // Try to parse the response body as JSON, but if it fails, just set it to null
  try {
    err.body = await res.json()
  } catch (_) {
    err.body = null
  }
  
  throw err
}

const catchError = (err) => {
  if (err.message === '401') {
    if (typeof window !== 'undefined') {
      window.location.href = "/login"
    }
    return
  }

  throw err
}

export const fetchWithResponse = (resource, options) => fetch(`${API_URL}/${resource}`, options)
  .then(checkErrorJson)
  .catch(catchError)

export const fetchWithoutResponse = (resource, options) => fetch(`${API_URL}/${resource}`, options)
  .then(checkError)
  .catch(catchError)
