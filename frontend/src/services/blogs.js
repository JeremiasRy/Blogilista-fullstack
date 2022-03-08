import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const addBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const addLike = async (blogToLike) => {
  const request = await axios.get(`${baseUrl}/${blogToLike}`)
  request.data.likes++
  axios.put(`${baseUrl}/${blogToLike}`, request.data)
  return request.data
}

const remove = (blogToDelete) => {
  const config = {
    headers: { Authorization: token },
  }
  axios.delete(`${baseUrl}/${blogToDelete}`, config)
  return blogToDelete
}

const addComment = async (commentObj) => {
  const request = await axios.post(`${baseUrl}/${commentObj.id}/comments`, commentObj)
  return request.data
}


export default { getAll, addBlog, setToken, addLike, remove, addComment }