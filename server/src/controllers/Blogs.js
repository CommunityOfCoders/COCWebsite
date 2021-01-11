const User = require("../models/User");
const Blog = require("../models/Blog");

module.exports = {
  async allBlogs(_req, res) {
    try {
      let blogs = await Blog.find();
      blogs = blogs.sort((a, b) => {
        if (Date(b.date) > Date(a.date)) return 1;
        else return -1;
      });
      res.status(200).json({ blogs });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  async viewBlogById(req, res) {
    try {
      const blogId = req.params.id;
      const blog = await Blog.findById(blogId);
      if (blog) {
        return res.status(200).json(blog);
      } else {
        res.status(404).json({
          error: "The requested blog doesn't exist",
        });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  async viewBlogsByTag(req, res) {
    try {
      const tag = req.params.tag;
      let blogs = await Blog.find({tags: {$in: [tag]}})
      blogs = blogs.sort((a, b) => {
        if (Date(b.date) > Date(a.date)) return 1;
        else return -1;
      });
      res.status(200).json({ blogs });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  },

  async uploadBlog(req, res) {
    try {
      // Assumed that req.body already has required fields
      const blog = await Blog.create(req.body);
      res.status(201).json({
        id: blog._id,
      });
    } catch (error) {
      res.status(500).json({
        error,
      });
    }
  },

  async editBlogById(req, res) {
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
        error: error.message,
      });
    }
  },
  async deleteBlogById(req, res, next) {
    // TODO: add isBlogAuthorized middleware
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    await blog.remove();
    res.status(204).json({});
  },
};
