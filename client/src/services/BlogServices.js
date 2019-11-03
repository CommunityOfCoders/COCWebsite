import Api from './Api'

export default {
    addBlog (blog) {
        return Api().post('blogs/new',blog)
    },
    getAllBLogs () {
        return Api().get('blogs')
    },
    getBlog (id) {
        return Api().get('blogs/' + id)
    }
}