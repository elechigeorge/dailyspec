const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

// Todo Schema
const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
})

todoSchema.plugin(timestamp)

 const TodoModel = mongoose.model('TodoModel', todoSchema);
 
 // export 
 module.exports = TodoModel;