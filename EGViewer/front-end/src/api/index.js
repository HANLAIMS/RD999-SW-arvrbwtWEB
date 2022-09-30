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
        return request('post','/pg-login', {email, password})
    }
}
export const list = {
    fetch(email,id) {
        return id? request('post',`/pg-shiplist/${id}`,{email}) : request('post','/pg-shiplist',{email})
    }
}
export const data = {
    fetch(id) {
        return request('get',`/pg-shipdata/${id}`)
    },
    fetchColumn(id,opmode) {
        return request('post',`/pg-shipdata-getcol/${id}`,{opmode})
    },
    fetchRecord(id,opmode,columnlist,startdate,enddate){
        return request('post',`/pg-shipdata-opdata/${id}`,{opmode,columnlist,startdate,enddate})
    },
    fetchAverage(id,opmode,columnlist,startdate,enddate){
        return request('post',`/pg-shipdata-avgopdata/${id}`,{opmode,columnlist,startdate,enddate})
    }
}
