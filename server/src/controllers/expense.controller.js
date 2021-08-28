const Expense = require('../models/expense.model')

const expenseController = {}

expenseController.get = async (req, res, next) => {
    const { user } = req;

    const query = {
        owner: user._id,
    }

    try {
        const result = await Expense.find(query);
        return res.send({
            expense: result
        })
    }
    catch (e) {
        next(e)
    }
}

expenseController.create = async (req, res, next) => {
    const { amount, description, created } = req.body
    const newExpense = new Expense({
        amount,
        description,
        created,
        owner: req.user
    });
    try {
        const saved = await newExpense.save();

        return res.send({
            success: true,
            expense: saved
        })
    } catch (e) {
        next(e);
    }
}

expenseController.destroy = async (req, res, next) => {
    const expense_id = req.params.expense_id;
    try {
        await Expense.deleteOne({ _id: expense_id });
        res.send({
            success: true
        })
    } catch (e) {
        next(e)
    }
}

expenseController.update = async (req, res, next) => {
    const expense_id = req.params.expense_id;
    const { amount, description, created } = req.body;
    try {
        const check = await Expense.findOne({ _id: expense_id })
        if (!check.owner.equals(req.user._id)) {
            const err = new Error('This expense object does not belong to you')
            err.status = 401
            throw err
        }
        const expense = await Expense.update(
            { _id: expense_id },
            { amount, description, created },
            { upsert: true })
        return res.send({
            success: true,
            expense
        })

    }
    catch (e) {
        next(e)
    }
}

module.exports = expenseController;