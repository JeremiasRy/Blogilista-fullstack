import axios from 'axios'
const baseUrl = '/api/login'

const login = async (userinfo) => {
  const response = await axios.post(baseUrl, userinfo)
  return response.data
}

export default { login }