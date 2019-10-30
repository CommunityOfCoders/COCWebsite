import Api from './Api'

export default {
    register (credentials) {
        return Api().post('register',credentials)
    },
    login (credentials) {
        return Api().post('login',credentials)
    },
    verifyToken (token) {
        return Api().post('verify-token',token)
    },
    getUser (username) {
        return Api().post('user',username)
    }
}