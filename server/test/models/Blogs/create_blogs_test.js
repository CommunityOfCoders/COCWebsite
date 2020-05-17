const assert = require("assert");
const Blog = require("../../../src/models/Blog");

describe('Testing Blogs', () => {

  beforeEach((done) => {
    Blog.remove().then(() => done());
  })

  it('creates a blog', (done) => {
    let blog = {
      blogTitle: "Test Blog Title",
      blogContent: "Test Blog Content",
      author: "Test author"
    };

    const newBlog = new Blog(blog);
    newBlog.save().then((blog) => {
      assert(!newBlog.isNew);
      assert(blog.blogTitle === "Test Blog Title");
      assert(blog.blogContent === "Test Blog Content");
      assert(blog.author === "Test author");
      assert(blog.date = Date.now());
      done();
    })
  });
})