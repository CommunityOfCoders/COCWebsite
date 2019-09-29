import Api from './Api'

export default {
    addEvent (event) {
        return Api().post('events',event)
    },
    getEvents () {
        return Api().get('events')
    }
}