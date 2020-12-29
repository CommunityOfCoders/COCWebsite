const AuthController = require('./controllers/AuthController')
const Events = require('./controllers/Events')
const Blogs = require('./controllers/Blogs')
const Register = require('./controllers/Register')
const GlimpseController = require('./controllers/GlimpseController')
const DomainController = require('./controllers/DomainController')
const ProjectController = require('./controllers/ProjectController')
const upload = require('./middleware/upload')
const auth = require('./middleware/auth')
const blog = require('./middleware/blog')
const user = require('./middleware/user')
const AlumniController = require('./controllers/AlumniController')

module.exports = (app) => {
    app.get('/api/hello', (req,res) => {res.json('Hello World')}) // Very hard to test and change

    // Auth
    app.post('/api/register',AuthController.register) // Tested
    app.post('/api/login',AuthController.login) // Tested
    app.post('/api/verify-token',AuthController.verifyToken) // Tested
    app.post('/api/user',AuthController.getUser) // Tested

    //Events Paths
    app.get('/api/events', Events.getEvents); // Tested
    app.post('/api/events', auth.loginRequired, user.isMember, upload.single('COC_Event'), Events.uploadEvent)
    app.put('/api/events/:id', auth.loginRequired, user.isMember, upload.single('COC_Event'),Events.updateEvent);
    app.put('/api/events/form', auth.loginRequired, user.isMember, Events.addForm) // Tested
    app.get('/api/events/:id', Events.getEventById); // Tested
    app.post('/api/events/reminder', Events.addReminder);
    app.delete('/api/events/reminder/:id', Events.cancelReminder);
    app.delete('/api/events/:id', auth.loginRequired, user.isMember, Events.deleteEvent); // Tested


    // Registration
    app.post('/api/reg-form', Register.regForm); // Incomplete controller

    // Glimpses
    app.get('/api/glimpses', GlimpseController.getAllGlimpses);
    app.get('/api/glimpses/:id', GlimpseController.getGlimpse);
    app.post('/api/glimpses',GlimpseController.getPhotos);
    app.post('/api/glimpses/new', user.isMember, GlimpseController.addGlimpse);
    app.put('/api/glimpses/edit/:id', user.isMember, GlimpseController.editGlimpse);
    app.delete('/api/glimpses/delete/:id', user.isMember, GlimpseController.deleteGlimpse);

    // Blogs
    app.get('/api/blogs', Blogs.allBlogs); // Tested
    app.get('/api/blogs/:id', Blogs.viewBlogById); // Tested
    app.post('/api/blogs/new', auth.loginRequired, Blogs.uploadBlog); // Tested
    app.put('/api/blogs/edit/:id', auth.loginRequired, blog.isBlogWritten, Blogs.editBlogById); // Tested
    app.delete('/api/blogs/delete/:id', auth.loginRequired, blog.isBlogWritten, Blogs.deleteBlogById); // Tested

    // Project Domains
    app.get('/api/domains', DomainController.allDomains); // Tested
    app.get('/api/domains/:id', DomainController.viewDomainById); // Tested
    app.post('/api/domains/new', auth.loginRequired, user.isMember, DomainController.createDomain); // Tested
    app.put('/api/domains/edit/:id', auth.loginRequired, user.isMember, DomainController.editDomainById); // Tested
    app.delete('/api/domains/delete/:id', auth.loginRequired, user.isMember, DomainController.deleteDomainById); // Tested

    // Projects
    app.get('/api/projects', ProjectController.allProjects); // Tested
    app.get('/api/projects/filter/:id', ProjectController.viewProjectsByDomain); // Tested
    app.get('/api/projects/:id', ProjectController.viewProjectById); // Tested
    app.post('/api/projects/new', auth.loginRequired, user.isMember, ProjectController.createProject); // Tested
    app.delete('/api/projects/delete/:id', auth.loginRequired, user.isMember, ProjectController.deleteProjectById); // Tested

    // Alumni
    app.get('/api/alumni', AlumniController.allAlumni); // Tested
    app.post('/api/alumni', AlumniController.createAlumnus); // Tested
}
