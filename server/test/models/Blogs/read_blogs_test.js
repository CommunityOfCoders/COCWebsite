const assert = require('assert');
const Blog = require("../../../src/models/Blog");

let blog;



describe("Reading blogs", () => {

  beforeEach((done) => {
    blog = new Blog({
      blogTitle: "Test Blog Title",
      blogContent: "Test Blog Content",
      author: "Test author"
    });
    blog.save().then(() => {
      done();
    });
  });

  afterEach((done) => {
    Blog.remove().then(() => done());
  })

  it("finds event with matching title", (done) => {
    Blog.findOne({ blogTitle: "Test Blog Title" })
      .then((blog) => {
        assert(blog != null);
        done();
      });
  });

  it("finds event with matching content", (done) => {
    Blog.findOne({ blogContent: "Test Blog Content" })
      .then((blog) => {
        assert(blog != null);
        done();
      });
  });

  it("finds event with matching author", (done) => {
    Blog.findOne({ author: "Test author" })
      .then((blog) => {
        assert(blog != null);
        done();
      });
  })
})