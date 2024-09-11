const destroy = async (path) => {
  const response = await fetch(`${window.env.API_URL}/${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json' ,
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  })

  if (response.status === 401) {
    window.location.href = '/login'
    return
  }

  if (!response.ok) {
    throw new Error(`Failed to destroy ${path}: ${response.statusText}`)
  }
}

export default destroy
