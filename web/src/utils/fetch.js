import 'isomorphic-fetch'

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  console.log(error)
  error.response = response
  console.log(error.response)
  throw error
}

export function parseJSON(response) {
  return response.json()
}
