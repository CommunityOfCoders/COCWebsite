const User = require("../models/User");
const Blog = require("../models/Blog");
const redis_client = require("../config/redis");

module.exports = {

  async allBlogs(_req, res) {
    try{
      const blogs = await Blog.find();
      res.status(200).json({blogs});
    }catch(e){
      res.status(400).json({error:e.message});
    }
  },

  async viewBlogById(req, res) {
    try{
      const blogId = req.params.id;
      const blog = await Blog.findById(blogId);
      if (blog) {
        // Store into cache
        redis_client.setex(`blog/${blogId}`, 3600, JSON.stringify(blog));
        return res.status(200).json(blog);
      } else {
        res.status(404).json({
          error: "The requested blog doesn't exist",
        });
      }
    }catch(e){
      res.status(500).json({error:e.message})
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
      // console.log(error);
      res.status(500).json({error:error.message});
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
