const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true
    },
    message: { 
        type: String, 
        required: true 
    },
    commentedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const blogSchema = new mongoose.Schema({
    title: { 
        type: String, 
        unique: true, 
        minlength: 5, 
        required: true 
    },
    content: { 
        type: String, 
        minlength: 50, 
        required: true 
    },
    author: { 
        type: String, 
        required: true 
    },
    tags: [{ 
        type: String 
    }],
    category: { 
        type: String, 
        default: 'General' },
    likes: [{ 
        type: String 
    }],
    comments: [commentSchema],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date 
    }
});

blogSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;