const AuthController = require('./controllers/AuthController')
const Events = require('./controllers/Events')
const Blogs = require('./controllers/Blogs')
const Register = require('./controllers/Register')
const upload = require('./middleware/upload')
const GlimpseController = require('./controllers/GLimpseController')

module.exports = (app) => {
    app.get('/api/hello', (req,res) => {res.json('Hello World')}) // Very hard to test and change

    // Auth
    app.post('/api/register',AuthController.register) // Tested
    app.post('/api/login',AuthController.login) // Tested
    app.post('/api/verify-token',AuthController.verifyToken) // Tested
    app.post('/api/user',AuthController.getUser) // Tested

    //Events Paths
    app.get('/api/events', Events.getEvents); // Tested
    app.post('/api/events', upload.single('COC_Event'), Events.uploadEvent)
    app.put('/api/events/form',Events.addForm) // Tested
    app.get('/api/events/:id', Events.getEventById); // Tested
    app.put('/api/events/:id', Events.updateEvent); // Tested
    app.delete('/api/events/:id', Events.deleteEvent); // Tested
    

    // Registration
    app.post('/api/reg-form', Register.regForm); // Incomplete controller
    app.get('/api/glimpses',GlimpseController.getPhotos) // Incomplete controller


    // Blogs
    app.get('/api/blogs', Blogs.allBlogs); // Tested
    app.get('/api/blogs/:id', Blogs.viewBlogById); // Tested
    app.post('/api/blogs/new', Blogs.uploadBlog); // Tested
    app.put('/api/blogs/edit/:id', Blogs.editBlogById); // Tested
    app.delete('/api/blogs/delete/:id', Blogs.deleteBlogById); // Tested
}