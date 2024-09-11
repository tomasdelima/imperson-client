const post = async (path, body, options = {}) => {
  options = {
    setContentType: true,
    stringifyBody: true,
    ...options,
  }

  let headers = { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
  if (options.setContentType) headers['Content-Type'] = 'application/json'

  const response = await fetch(`${window.env.API_URL}/${path}`, {
    method: 'POST',
    headers,
    body: options.stringifyBody ? JSON.stringify(body) : body,
  })

  if (response.status === 401) {
    window.location.href = '/login'
    return
  }

  if (response.ok) {
    try {
      return await response.json()
    } catch (e) {
      return await response.text()
    }
  }

  throw new Error(`Failed to post ${path}: ${response.statusText}`)
}

export default post
