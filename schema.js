const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        minlength: 5,
        required: [true, "Please provide the title"]
    },
    content: {
        type: String,
        required: true,
        minlength: 50,
        required: [true, "Please provide the content"]
    },
    author: {
        type: String,
        required: true,
        ref: "User",
        required: [true, "Please provide the author"]
    },
    tags: [{
        type: [String],
    }],
    category: {
        type: String,
        default: "General"
        required: [true, "Please provide the category"]
    },
    likes: [{
        type: String
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const CommentSchema = new mongoose.Schema({
    username: { type: String, required: [true, "Please enter your username"]}, 
    message: { type: String, required: [true, "Please enter the message you want"] },
    commentedAt: { type: Date, default: Date.now }
  });


BlogPostSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);
module.exports = BlogPost;
