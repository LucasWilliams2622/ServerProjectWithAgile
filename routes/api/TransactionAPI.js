
var express = require('express');
var router = express.Router();
const TransactionController = require('../../components/Transaction/TransactionController');


//http://localhost:3000/transaction/api/search-by-id?id=
router.get('/search-by-id', async (req, res, next) => {
    try {
        const { id } = req.query;
        const transaction = await TransactionController.searchTransactionById(id);
        return res.status(200).json({ result: true, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Id error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api/search-by-category?category=
router.get('/search-by-category', async (req, res, next) => {
    try {
        const { category } = req.query;
        const transaction = await TransactionController.searchProductByCategory(category);
        return res.status(200).json({ result: true, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Category error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api/search-by-money?money=
router.get('/search-by-money', async (req, res, next) => {
    try {
        const { money } = req.query;
        const transaction = await TransactionController.searchProductByMoney(money);
        return res.status(200).json({ result: true, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Money error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api/search-by-note?note=
router.get('/search-by-note', async (req, res, next) => {
    try {
        const { note } = req.query;
        const transaction = await TransactionController.searchProductByNote(note);
        return res.status(200).json({ result: true, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Note error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api/searchIncome?type=
router.get('/searchIncome', async (req, res, next) => {
    try {
        const { type } = req.query;
        const transaction = await TransactionController.searchtotalIncome(type);
        let totalIncome = ''
        if(type == 1){
            // totalIncome = ???
            return res.status(200).json({ result: true, transaction: transaction });
        }
    } catch (error) {
        console.log('Search Total Income error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api
router.get('/searchExpense', async (req, res, next) => {
    try {
        const { category } = req.body;
        console.log(category);
        const transaction = await TransactionController.searchTotalExpense(category);
        return res.status(200).json({ result: true, transaction: transaction });
    } catch (error) {
        console.log('Search Total Expense error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});


module.exports = router;