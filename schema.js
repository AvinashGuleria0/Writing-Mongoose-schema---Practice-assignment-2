const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minlength: 5
    },
    content: {
        type: String,
        required: true,
        minlength: 50
    },
    author: {
        type: String,
        required: true,
        ref: "User"
    },
    tags: [{
        type: [String],
    }],
    category: {
        type: String,
        default: "General"
    },
    likes: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const CommentSchema = new mongoose.Schema({
    username: { type: String, required: true }, 
    message: { type: String, required: true },
    commentedAt: { type: Date, default: Date.now }
  });


BlogPostSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;