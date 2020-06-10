const AuthController = require('./controllers/AuthController')
const Events = require('./controllers/Events')
const Blogs = require('./controllers/Blogs')
const Register = require('./controllers/Register')
const upload = require('./middleware/upload')
const GlimpseController = require('./controllers/GLimpseController')

module.exports = (app) => {
    app.get('/api/hello', (req,res) => {res.send('Hello World')})

    app.post('/api/register',AuthController.register)

    app.post('/api/login',AuthController.login)

    app.post('/api/verify-token',AuthController.verifyToken)

    app.post('/api/user',AuthController.getUser)

    //Events Paths
    app.get('/api/events', Events.getEvents);
    app.post('/api/events', upload.single('COC_Event'), Events.uploadEvent)
    app.put('/api/events/form',Events.addForm)
    app.get('/api/events/:id', Events.getEventById);
    app.put('/api/events/:id', upload.single('COC_Event'),Events.updateEvent);
    app.delete('/api/events/:id', Events.deleteEvent);
    

    // Registration
    app.post('/api/reg-form', Register.regForm);

    app.get('/api/glimpses',GlimpseController.getPhotos)


    // Blogs
    app.get('/api/blogs', Blogs.allBlogs);
    app.get('/api/blogs/:id', Blogs.viewBlogById);
    // app.get('/api/blogs/new', Blogs.newBlog);
    app.post('/api/blogs/new', Blogs.uploadBlog);
    // app.get('/api/blogs/edit/:id', Blogs.editBlog);
    app.put('/api/blogs/edit/:id', Blogs.editBlogById);
    app.delete('/api/blogs/delete/:id', Blogs.deleteBlogById);
}