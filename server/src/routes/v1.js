const express = require('express');
const router = express.Router();
const passport = require('passport')

const userController = require('../controllers/users.controller')
const expenseController = require('../controllers/expense.controller')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.all('*', (req, res, next) => {
    passport.authenticate('jwt', { session: false },(err, user)=>{
        if (err || !user) {
            const error = new Error('You are not authorized')
            error.status = 401;
            throw error
        }
        req.user = user; 
        return next()
    })(req, res, next)
})


//-------- protected routes ------//

router.get('/expense', expenseController.get);
router.post('/expense', expenseController.create);
router.delete('/expense/:expense_id', expenseController.destroy)
router.put('/expense/:expense_id', expenseController.update)


module.exports = router;