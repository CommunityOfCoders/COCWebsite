const AuthController = require('./controllers/AuthController')
const Events = require('./controllers/Events')
const Blogs = require('./controllers/Blogs')
const Register = require('./controllers/Register')
const GlimpseController = require('./controllers/GlimpseController')
const DomainController = require('./controllers/DomainController')
const ProjectController = require('./controllers/ProjectController')
const AlumniController = require('./controllers/AlumniController')
const ResourcesController = require('./controllers/ResourcesController')
const AchievementsController = require('./controllers/AchievementsController')
const upload = require('./middleware/upload')
const auth = require('./middleware/auth')
const blog = require('./middleware/blog')
const user = require('./middleware/user')
const cache = require('./middleware/cache');
const event = require('./middleware/event');

module.exports = (app) => {
  app.get('/api/hello', (req, res) => { res.json("Hello World") }); // Very hard to test and change

  // Auth
  app.post('/api/register', auth.validate('register'), AuthController.register) // Tested
  app.post('/api/login', auth.validate('login'), AuthController.login) // Tested
  app.post('/api/verify-token', auth.validate('verifyToken'), AuthController.verifyToken) // Tested
  app.post('/api/user', auth.validate('getUser'), AuthController.getUser) // Tested
  app.post('/api/forgot-password', auth.validate('forgetPassword'), AuthController.forgotPassword);
  app.post('/api/new-password', auth.validate('newPassword'), AuthController.newPassword);

  //Events Paths
  app.get('/api/events', cache.getFromCache, Events.getEvents, cache.setCache); // Tested
  app.post('/api/events', event.validate('checkEventBody'), auth.loginRequired, user.isMember, upload.single('COC_Event'), Events.uploadEvent, cache.deleteCache)
  app.put('/api/events/:id', event.validate('checkID'), event.validate('checkEventBody'), auth.loginRequired, user.isMember, upload.single('COC_Event'), Events.updateEvent, cache.deleteCache);
  app.put('/api/events/form', event.validate('checkID'), event.validate('checkFormURL'), auth.loginRequired, user.isMember, Events.addForm) // Tested
  app.get('/api/events/:id', event.validate('checkID'), Events.getEventById); // Tested
  app.post('/api/events/register', event.validate('checkQueryParams'), Events.registerUser, cache.deleteCache);
  app.post('/api/events/unregister', event.validate('checkQueryParams'), Events.unregisterUser, cache.deleteCache);
  app.delete('/api/events/:id', event.validate('checkID'), auth.loginRequired, user.isMember, Events.deleteEvent, cache.deleteCache); // Tested

  // Glimpses
  app.get("/api/glimpses", GlimpseController.getAllGlimpses);
  app.get("/api/glimpses/:id", GlimpseController.getGlimpse);
  app.post("/api/glimpses", GlimpseController.getPhotos);
  app.post("/api/glimpses/new", user.isMember, GlimpseController.addGlimpse);
  app.put(
    "/api/glimpses/edit/:id",
    user.isMember,
    GlimpseController.editGlimpse
  );
  app.delete(
    "/api/glimpses/delete/:id",
    user.isMember,
    GlimpseController.deleteGlimpse
  );

  // Glimpses
  app.get('/api/glimpses', GlimpseController.getAllGlimpses);
  app.get('/api/glimpses/:id', GlimpseController.getGlimpse);
  app.post('/api/glimpses', GlimpseController.getPhotos);
  app.post('/api/glimpses/new', user.isMember, GlimpseController.addGlimpse);
  app.put('/api/glimpses/edit/:id', user.isMember, GlimpseController.editGlimpse);
  app.delete('/api/glimpses/delete/:id', user.isMember, GlimpseController.deleteGlimpse);

  // Blogs
  app.get('/api/blogs', Blogs.allBlogs); // Tested
  app.get('/api/blogs/:id', Blogs.viewBlogById); // Tested
  app.get('/api/blogs/tag/:tag', Blogs.viewBlogsByTag);
  app.post('/api/blogs/new', auth.loginRequired, Blogs.uploadBlog); // Tested
  app.put('/api/blogs/edit/:id', auth.loginRequired, blog.isBlogWritten, Blogs.editBlogById); // Tested
  app.delete('/api/blogs/delete/:id', auth.loginRequired, blog.isBlogWritten, Blogs.deleteBlogById); // Tested

  // Project Domains
  app.get('/api/domains', cache.getFromCache, DomainController.allDomains, cache.setCache); // Tested
  app.get('/api/domains/:id', DomainController.viewDomainById); // Tested
  app.post('/api/domains/new', auth.loginRequired, user.isMember, DomainController.createDomain, cache.deleteCache); // Tested
  app.put('/api/domains/edit/:id', auth.loginRequired, user.isMember, DomainController.editDomainById, cache.deleteCache); // Tested
  app.delete('/api/domains/delete/:id', auth.loginRequired, user.isMember, DomainController.deleteDomainById, cache.deleteCache); // Tested

  // Projects
  app.get('/api/projects', cache.getFromCache, ProjectController.allProjects, cache.setCache); // Tested
  app.get('/api/projects/filter/:id', ProjectController.viewProjectsByDomain); // Tested
  app.get('/api/projects/:id', ProjectController.viewProjectById); // Tested
  app.post('/api/projects/new', auth.loginRequired, user.isMember, ProjectController.createProject, cache.deleteCache); // Tested
  app.delete('/api/projects/delete/:id', auth.loginRequired, user.isMember, ProjectController.deleteProjectById, cache.deleteCache); // Tested

  // Alumni
  app.get('/api/alumni', cache.getFromCache, AlumniController.allAlumni, cache.setCache); // Tested
  app.post('/api/alumni', AlumniController.createAlumnus, cache.deleteCache); // Tested

  // Resources
  app.get('/api/topics', cache.getFromCache, ResourcesController.getAllTopics, cache.setCache);
  app.get('/api/resources/:id', ResourcesController.getResourceById);
  app.get('/api/topics/:id', ResourcesController.getTopicById);
  app.post('/api/resources/add', auth.loginRequired, user.isMember, ResourcesController.addResource);
  app.post('/api/topics/add', auth.loginRequired, user.isMember, ResourcesController.addTopic, cache.deleteCache);
  app.put('/api/resources/edit/:id', auth.loginRequired, user.isMember, ResourcesController.updateResourceById);
  app.put('/api/topics/edit/:id', auth.loginRequired, user.isMember, ResourcesController.updateTopicById, cache.deleteCache);
  app.delete('/api/resources/delete/:id', auth.loginRequired, user.isMember, ResourcesController.deleteResourceById);
  app.delete('/api/topics/delete/:id', auth.loginRequired, user.isMember, ResourcesController.deleteTopicById, cache.deleteCache);

  // Achievements
  app.get('/api/achievements', cache.getFromCache, AchievementsController.allAchievements, cache.setCache);
  app.post('/api/achievements', AchievementsController.createAchievement, cache.deleteCache);
}
