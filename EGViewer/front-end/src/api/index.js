import axios from 'axios'
import router from '../router'

const DOMAIN = process.env.VUE_APP_API_URL
const UNAUTHORIZED = 401
const onUnauthorized = () => {
    router.push(`/sign-in?rPath=${encodeURIComponent(location.pathname)}`)
}

const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data
    }).then(result => result.data)
    .catch(result => {
        const {status} = result.response
        if (status === UNAUTHORIZED) onUnauthorized()
        throw result.response
    })
}

export const setAuthInHeader = token => {
    axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
}

const {token} = localStorage
if (token) setAuthInHeader(token)

export const dashboard = {
    fetch() {
        return request('get','/boards')
    }
}
export const auth = {
    login(email,password) {
        return request('post','/login', {email, password})
    }
}