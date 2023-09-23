import axios from "axios"
import Cookies from "js-cookie"

// ** jwtConfig <= Will be used by this service
const config = () => {
  return {
    // ** This will be prefixed in authorization header with token
    // ? e.g. Authorization: Bearer <token>
    tokenType: "Bearer",
  
    // ** Value of this property will be used as key to store JWT token in storage
    storageTokenKeyName: "token",
    storageUserKeyName: "userData"
  }
}
const jwtConfig = config()

// Jika tidak memiliki refresh token
// ** For Refreshing Token
// const isAlreadyFetchingAccessToken = false
// ** For Refreshing Token
// const subscribers = []

const getRedirectPath = () => {
  return window.sessionStorage.getItem("redirect_path") ?? "/"
}

const getToken = (): string => {
  return Cookies.get(jwtConfig.storageTokenKeyName) ?? ""
}

const currentUrl = (): string => {
  return process.env.REACT_APP_BE_URL as string
}

// ** Request Interceptor
const services = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API
})
services.interceptors.request.use(
  config => {
    // ** Get token from localStorage
    const accessToken = getToken()

    // ** If token is present add it to request's Authorization Header
    if (accessToken) {
      // ** eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`
    }
    return config
  },
  error => Promise.reject(error)
)

// ** Add request/response interceptor
services.interceptors.response.use(
  response => response,
  error => {
    // ** const { config, response: { status } } = error

    // Jika tidak memiliki refresh token
    const { response } = error
    // Jika memiliki refresh token
    // const { config, response } = error
    // const originalRequest = config

    // ** if (status === 401) {
    if (response && response.status === 401) {
      Cookies.remove(jwtConfig.storageTokenKeyName)
      window.sessionStorage.setItem("redirect_path", window.location.pathname)
      window.location.replace(`${currentUrl()}/login`)
      // Jika memiliki refresh token
      // if (!isAlreadyFetchingAccessToken) {
      //   isAlreadyFetchingAccessToken = true
      //   refreshToken().then(r => {
      //     isAlreadyFetchingAccessToken = false

      //     // ** Update accessToken in localStorage
      //     setToken(r.data.accessToken)
      //     setRefreshToken(r.data.refreshToken)

      //     onAccessTokenFetched(r.data.accessToken)
      //   })
      // }
      // const retryOriginalRequest = new Promise(resolve => {
      //   addSubscriber(accessToken => {
      //     // ** Make sure to assign accessToken according to your response.
      //     // ** Check: https://pixinvent.ticksy.com/ticket/2413870
      //     // ** Change Authorization header
      //     originalRequest.headers.Authorization = `${jwtConfig.tokenType} ${accessToken}`
      //     resolve(services(originalRequest))
      //   })
      // })
      // return retryOriginalRequest
    }
    return Promise.reject(error)
  }
)

export { jwtConfig, services, getRedirectPath }