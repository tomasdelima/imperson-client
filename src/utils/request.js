const request = async (path, method, body = {}, options = {}) => {
  options = {
    setContentType: true,
    stringifyBody: true,
    ...options,
  }

  let headers = { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
  if (options.setContentType) headers['Content-Type'] = 'application/json'

  let data = {
    method: method,
    headers,
  }

  if (body) {
    data.body = options.stringifyBody ? JSON.stringify(body) : body
  }

  const response = await fetch(`${window.env.API_URL}/${path}`, data)

  if (response.status === 401) {
    window.location.href = '/sign-in'
    return
  }

  if (response.ok) {
    const data = await response.text()
    try {
      return JSON.parse(data)
    } catch (e) {
      return data
    }
  }

  throw new Error(`Failed to post ${path}: ${response.statusText}`)
}

export default request
