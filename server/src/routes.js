const AuthController = require('./controllers/AuthController')
const Events = require('./controllers/Events')
const upload = require('./controllers/posterUpload')
const Glimpsesupload = require('./config/multerglimpsesconfig')
const GlimpseController = require('./controllers/GLimpseController')

module.exports = (app) => {
    app.post('/register',AuthController.register)

    app.post('/login',AuthController.login)

    app.post('/verify-token',AuthController.verifyToken)

    //Events Paths
    app.get('/events', getAllEvents);
    app.post('/events', upload.single('COC_Event'), Events.uploadEvent)
    app.get('/events/:id', getEvent);
    app.put('/events/:id', updateEvent);
    app.delete('/events/:id', deleteEvent);

    app.post('/glimpses/upload',Glimpsesupload.fields([{name: 'photos',maxCount: 10}]),GlimpseController.save)
}