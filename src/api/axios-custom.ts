import axiosClient from 'axios'

const instance = axiosClient.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true
})

instance.interceptors.request.use((config) => {
  if (
    typeof window !== 'undefined' &&
    window &&
    window.localStorage &&
    window.localStorage.getItem('access_token')
  ) {
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('access_token')
  }

  if (!config.headers.Accept && config.headers['Content-Type']) {
    config.headers.Accept = 'application/json'
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
  }

  return config
})

instance.interceptors.response.use(
  (res) => Promise.resolve(res.data),
  (error) => {
    if (error?.response?.data?.errors || error?.response?.data?.message) {
      ElMessage({
        message: error?.response?.data?.errors
          ? Object.values(error?.response?.data?.errors)[0]
          : error.response.data.message,
        type: 'error'
      })
    } else {
      ElMessage({
        message: error.message,
        type: 'error'
      })
    }

    return Promise.reject(error)
  }
)

export default instance
