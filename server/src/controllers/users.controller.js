const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



const userController = {};
//------- register logic -------//

userController.register = async (req, res, next) => {
    const { name, email, joined } = req.body;
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        joined
    })

    newUser.save()
        .then(user => { res.send({ user }) })
        .catch(e => {
            if (e.code === 11000 && e.name === 'MongoError') {
                var error = new Error()
                error.message = (`Email adress ${newUser.email} is already registered`)
                next(error)
            } else {
                next(e)
            }
        })
};


userController.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            const err = new Error(`The email ${email} is not registered`)
            err.status = 401
            next(err);
        }
        bcrypt.compare(password, user.password, (err, matched) => {
            if (err) {
                return err
            } else if (matched) {
                // create JWT
                const secret = process.env.JWT_SECRET;
                const expiration = process.env.JWT_EXPIRATION;

                const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expiration })
                res.send({ token })
            } else {
                res.status(401).send({
                    error: 'invalid email or password'
                })
            }
        })
    } catch (e) {
        next(e)
    }
};

userController.me = (req, res, next) => {
    const { user } = req;
    res.send({ user })
}

module.exports = userController;