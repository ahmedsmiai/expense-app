const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    joined: { type: Date, default: new Date() }
});

UserSchema.methods.toJSON = function () {
    const userObject = this.toObject()
    delete userObject.password
    return userObject
}
const User = mongoose.model('User', UserSchema)
module.exports = User;