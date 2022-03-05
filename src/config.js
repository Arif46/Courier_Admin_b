import axios from 'axios'

// const baseURL = 'http://localhost:8000/api/'
const baseURL = 'https://api.bahokbd.com/api/'

// Handling server error
const errorHandler = (error) => {
  if (error.response.status == 401) {
    // localStorage.removeItem('accessToken');  
    // window.vm.$router.push('/auth/login')
  } else {
    return error
  }
}

export default {
  async execute (method, uri, data, params = {}) {
    const accessToken = localStorage.getItem('accessToken')

    const client = axios.create({
      baseURL: baseURL,
      json: true,
      withCredentials: true
    })

    client.interceptors.response.use(response => response, error => errorHandler(error))

    return client({
      method,
      url: uri,
      data,
      params: params,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    }).then(req => {
      return req.data
    })
  },
  
  getData (uri, params = {}) {
    return this.execute('get', uri, {}, params)
  },
  postData (uri, data) {
    return this.execute('post', uri, data)
  },
  putData (uri, data) {
    return this.execute('put', uri, data)
  },
  deleteData (uri) {
    return this.execute('delete', uri)
  }
}
