const User = require("../models/User");
const Blog = require("../models/Blog");

module.exports = {
  async allBlogs(_req, res) {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  },

  async viewBlogById(req, res) {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (blog) {
      res.status(200).json(blog);
    } else {
      res.status(404).json({
        error: "The requested blog doesn't exist",
      });
    }
  },

  async uploadBlog(req, res) {
    // TODO: add isBlogAuthorized middleware
    try {
      // Assumed that req.body already has required fields
      const blog = await Blog.create(req.body);
      res.status(201).json({
        id: blog._id,
      });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  },

  async editBlogById(req, res) {
    // TODO: add isBlogAuthorized middleware
    try {
      // Assumed that req.body already has required fields
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.json({
        id: blog._id,
        blogTitle: blog.blogTitle,
      });
    } catch (error) {
      res.status(400).json({
        error: error,
      });
    }
  },
  async deleteBlogById(req, res) {
    // TODO: add isBlogAuthorized middleware
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    await blog.remove();
    res.status(204).json({});
  },
};
