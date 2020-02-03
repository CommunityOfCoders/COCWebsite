const AuthController = require('./controllers/AuthController')
const Events = require('./controllers/Events')
const Blogs = require('./controllers/Blogs')
const Register = require('./controllers/Register')
const upload = require('./middleware/upload')
const GlimpseController = require('./controllers/GLimpseController')

module.exports = (app) => {
    app.post('/register',AuthController.register)

    app.post('/login',AuthController.login)

    app.post('/verify-token',AuthController.verifyToken)

    app.post('/user',AuthController.getUser)

    //Events Paths
    app.get('/events', Events.getEvents);
    app.post('/events', upload.single('COC_Event'), Events.uploadEvent)
    app.put('/events/form',Events.addForm)
    app.get('/events/:id', Events.getEventById);
    app.put('/events/:id', Events.updateEvent);
    app.delete('/events/:id', Events.deleteEvent);
    

    // Registration
    app.post('/reg-form', Register.regForm);

    app.get('/glimpses',GlimpseController.getPhotos)


    // Blogs
    app.get('/blogs', Blogs.allBlogs);
    app.get('/blogs/:id', Blogs.viewBlogById);
    // app.get('/blogs/new', Blogs.newBlog);
    app.post('/blogs/new', Blogs.uploadBlog);
    // app.get('/blogs/edit/:id', Blogs.editBlog);
    app.put('/blogs/edit/:id', Blogs.editBlogById);
    app.delete('/blogs/delete/:id', Blogs.deleteBlogById);
}