const User = require('../models/User')
const Blog = require('../models/Blog')

module.exports = {
    async allBlogs(_req, res) {
        const blogs = await Blog.find();
        /*res.json([{
         id: '1',
         title: 'testing',
         author: 'palak',
         article: 'server and new_client connection'
     }]);*/
        //==========tested this server and client connected

        res.status(200).json(blogs);
    },
    async viewBlogById(req, res) {
        const blogId = req.params.id;
        const doesBlogExist = await Blog.exists({ _id: blogId });
        if (doesBlogExist) {
            const blog = await Blog.findById(blogId);
            res.status(200).json(blog);
        }
        else {
            res.status(404).json({
                err: "The requested blog doesn't exist"
            });
        }
    },
    // async newBlog (req,res) {

    // },
    async uploadBlog(req, res) {
        // TODO: add isBlogAuthorized middleware
        try {
            // Assumed that req.body already has required fields
            // console.log(req.body);
            const blog = await Blog.create(req.body);
            res.status(201).json({
                "id": blog._id
            });
        } catch (err) {
            // console.log(err);
            res.status(500).send({
                err: err
            })
        }
    },
    // async editBlog (req,res) {

    // },
    async editBlogById(req, res) {
        // TODO: add isBlogAuthorized middleware
        try {
            // Assumed that req.body already has required fields
            const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
            res.json({
                "id": blog._id
            });
        } catch (err) {
            res.status(400).send({
                err: err
            })
        }
    },
    async deleteBlogById(req, res) {
        // TODO: add isBlogAuthorized middleware
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        await blog.remove();
        res.status(204).send({});
    },
}