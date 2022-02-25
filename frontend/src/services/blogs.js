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
  const addLike = await axios.put(`${baseUrl}/${blogToLike}`, request.data)
  console.log(addLike)
  return addLike.data
}

const remove = async (blogToDelete) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.delete(`${baseUrl}/${blogToDelete}`, config)
  return request.data
}


export default { getAll, addBlog, setToken, addLike, remove }