const put = async (path, body) => {
  const response = await fetch(`${window.env.API_URL}/${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
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

  throw new Error(`Failed to get ${path}: ${response.statusText}`)
}

export default put
