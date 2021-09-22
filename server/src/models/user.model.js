const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = Schema({
    name: { type: String, required: true },
    email: {
        type: String, required: true, index: true, unique: true, validate: {
            isAsync: true,
            validator: function (value, isValid) {
                const self = this;
                return self.constructor.findOne({ email: value })
                    .exec(function (err, user) {
                        if (err) {
                            throw err;
                        }
                        else if (user) {
                            if (self.id === user.id) {  // if finding and saving then it's valid even for existing email
                                return isValid(true);
                            }
                            return isValid(false);
                        }
                        else {
                            return isValid(true);
                        }

                    })
            },
            message: 'The email address is already taken!'
        }},
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