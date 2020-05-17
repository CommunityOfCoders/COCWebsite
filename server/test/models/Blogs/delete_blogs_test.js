const assert = require('assert');
const Blog = require("../../../src/models/Blog");

let blog;



describe("Delete blogs", () => {

  beforeEach((done) => {
    blog = new Blog({
      blogTitle: "Test Blog Title",
      blogContent: "Test Blog Content",
      author: "Test author"
    });
    blog.save().then(() => done());
  });
  
  afterEach((done) => {
    Blog.remove().then(() => done());
  })

  it("finds blog with matching title", (done) => {
    Blog.findOneAndDelete({ blogTitle: "Test Blog Title" })
      .then((returnedBlog) => {
        assert(returnedBlog !== null);
        assert(returnedBlog.blogContent === blog.blogContent);
        assert(returnedBlog.author === blog.author);
        done();
      });
  });

  it("finds blog with matching content", (done) => {
    Blog.findOneAndDelete({ blogContent: "Test Blog Content" })
      .then((returnedBlog) => {
        assert(returnedBlog !== null);
        assert(returnedBlog.blogTitle === blog.blogTitle);
        assert(returnedBlog.author === blog.author);
        done();
      });
  });

  it("finds blog with matching author", (done) => {
    Blog.findOneAndDelete({ author: "Test author" })
      .then((returnedBlog) => {
        assert(returnedBlog !== null);
        assert(returnedBlog.blogContent === blog.blogContent);
        assert(returnedBlog.blogTitle === blog.blogTitle);
        done();
      });
  });
})