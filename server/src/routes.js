const AuthController = require('./controllers/AuthController')
const addEvent = require('./controllers/addEvent')
const upload = require('./controllers/posterUpload')
const Glimpsesupload = require('./config/multerglimpsesconfig')
const GlimpseController = require('./controllers/GLimpseController')

module.exports = (app) => {
    app.post('/register',AuthController.register)

    app.post('/login',AuthController.login)

    //Events Paths
    app.post('/events/upload', upload.single('COC_Event'), addEvent.uploadEvent)

    app.post('/glimpses/upload',Glimpsesupload.fields([{name: 'photos',maxCount: 10}]),GlimpseController.save)
}