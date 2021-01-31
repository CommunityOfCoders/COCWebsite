const mongoose = require('mongoose');

const blog = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: true
    },
    blogContent: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: false
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    author: {
        type: String,
        required: true
    },
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});

const Blog = mongoose.model('blog', blog);

module.exports = Blog;
