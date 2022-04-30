var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var schema = new Schema({
    content: {
        type: String,
    },
    blog: {
        type: mongoose.Types.ObjectId,
        ref: 'Blog'
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('Course', schema);