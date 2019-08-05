import Api from './Api'

export default {
    addEvent (event) {
        return Api().post('events/upload',event)
    }
}