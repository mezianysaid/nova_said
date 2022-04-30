var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
// require('dotenv/config');
const config = require('../config/_config');
var Schema = mongoose.Schema;
var Jwt = require('jsonwebtoken');
var UserSchema = new Schema({
        fullName: {
            type: String,
            require: "Full Name can\'t be empty",
        },
        email: {
            type: String,
            require: "Email can\'t be empty",
            unique: true
        },
        password: {
            type: String,
            require: "Password can\'t be empty",
            minlength: [3, 'Password must be atleast 4 character long']
        },
        Roles: { type: String, enum: ['USER', 'ADMIN'], default: "USER" },
        saltSecret: { type: String, default: '' },
        CreatedAt: { type: Date, default: Date.now() }
    })
    //Custom Validation for email
UserSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid E-mail');
//events
UserSchema.pre('save', function(next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.generateJwt = function() {
    return Jwt.sign({ _id: this._id }, config.JWT_Secret, {
        expiresIn: config.Jwt_Exp
    });
};





module.exports = mongoose.model('user', UserSchema);