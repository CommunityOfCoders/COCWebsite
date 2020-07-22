const User = require("../models/User");
const Blog = require("../models/Blog");

module.exports = {

  async allBlogs(_req, res, next) {
    try{
      const blogs = await Blog.find();
      return res.status(200).json(blogs);
    }catch(e){
      return res.status(400).json({error:e.message});
    }
  },

  async viewBlogById(req, res) {
    try{
      const blogId = req.params.id;
      const blog = await Blog.findById(blogId);
      if (blog) {
        return res.status(200).json(blog);
      } else {
        return res.status(404).json({
          error: "The requested blog doesn't exist",
        });
      }
    }catch(e){
      return res.status(500).json({error:e.message})
    }
  },

  async uploadBlog(req, res, next) {
    try {
      // Assumed that req.body already has required fields
      const blog = await Blog.create(req.body);
      return res.status(201).json({
        id: blog._id,
      });
    } catch (error) {
      // console.log(error);
      return res.status(500).json({message:error.message});
    }
  },

  async editBlogById(req, res, next) {
    // TODO: add isBlogAuthorized middleware
    try {
      // Assumed that req.body already has required fields
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.json({
        id: blog._id,
        blogTitle: blog.blogTitle,
      });
    } catch (error) {
        return res.status(400).json({
        error: error.message,
      });
    }
  },
  async deleteBlogById(req, res, next) {
    // TODO: add isBlogAuthorized middleware
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    await blog.remove();
    return res.status(204).json({message:"Successfully deleted blog"});
  },
};
