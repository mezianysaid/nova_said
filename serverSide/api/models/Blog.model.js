const { ObjectId } = require('mongodb');
var mongoose = require('mongoose');
const Schema = mongoose.Schema;
var schema = new Schema({
    title: { type: String },
    module: { type: String },
    image: { type: String },
    courses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }]
});

module.exports = mongoose.model('Blog', schema);