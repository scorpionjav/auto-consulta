import axios from 'axios'

const API_URL = process.env.API_URL || 'http://localhost:3000'

// const token = localStorage.getItem('user-token')
// if (token) {
//   axios.defaults.headers.common['Authorization'] = token
// }

export default axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // 'Authorization': usuario
  }
})