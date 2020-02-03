import Api from './Api'

export default {
    addEvent (event) {
        return Api().post('events',event)
    },
    getEvents () {
        return Api().get('events')
    },
    addForm (form) {
        return Api().put('events/form',form)
    },
    getEvent (id) {
        return Api().get('events/' + id)
    }
}