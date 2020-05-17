const assert = require('assert');
const Blog = require("../../../src/models/Blog");

let blog;
let newBlog;

describe("Updating blogs", () => {

  beforeEach((done) => {
    blog = new Blog({
      blogTitle: "Test Blog Title",
      blogContent: "Test Blog Content",
      author: "Test author"
    });
    blog.save().then(() => {
      done();
    });

    newBlog = {
      blogTitle: "New Blog Title",
      blogContent: "New Blog Content",
      author: "New author"
    };
  });

  afterEach((done) => {
    Blog.remove().then(() => done());
  })

  it("finds blog with matching title", (done) => {
    Blog.findOneAndUpdate({ blogTitle: "Test Blog Title" }, newBlog)
      .then(() => Blog.find())
      .then((blog) => {
        assert(blog !== null);
        assert(blog[0].blogTitle === "New Blog Title");
        assert(blog[0].blogContent === "New Blog Content");
        assert(blog[0].author === "New author");
        done();
      });
  });

    it("finds blog with matching content", (done) => {
      Blog.findOneAndUpdate({ blogContent: "Test Blog Content" }, newBlog)
        .then(() => Blog.find())
        .then((blog) => {
          assert(blog !== null);
          assert(blog[0].blogTitle === "New Blog Title");
          assert(blog[0].blogContent === "New Blog Content");
          assert(blog[0].author === "New author");
          done();
        });
    });

    it("finds blog with matching author", (done) => {
      Blog.findOneAndUpdate({ author: "Test author" }, newBlog)
        .then(() => Blog.find())
        .then((blog) => {
          assert(blog !== null);
          assert(blog[0].blogTitle === "New Blog Title");
          assert(blog[0].blogContent === "New Blog Content");
          assert(blog[0].author === "New author");
          done();
        });
    });

})