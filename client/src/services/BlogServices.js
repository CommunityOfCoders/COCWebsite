import Api from './Api'

export default {
    addBlog (blog) {
        return Api().post('blogs/new',blog)
    }
}