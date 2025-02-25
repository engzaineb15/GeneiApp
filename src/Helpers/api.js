import axios from 'axios'

export default axios.create({
  baseURL: 'https://genie-backend.onrender.com/api/v1',
  //   timeout: 30000,
})

