var express = require('express')
var router = express.Router();

const TransactionController = require('../../components/Transaction/TransactionController')

//http://localhost:3000/api/transactions/new
router.post('/new', [], async (req, res, next) => {
    try {
        const { name, money, note, image, category} = req.body;
        const result = await TransactionController.addNewTransaction(name, money, note, image, category);
        console.log("aaaaaaaaaaaaaa", result);
        return res.status(200).json({ ...result });
    } catch (error) {
        return res.status(400).json({ error: error })
    }
})

//http://localhost:3000/api/transactions/get-all-trans
router.get('/get-all-trans', [], async (req, res, next) => {
    try {
        return await res.status(200).json(await TransactionController.getTransactions());
    } catch (error) {
        return res.status(400).json({ error: error })
    }
})

//http://localhost:3000/api/transactions/get-trans-by-id
router.get('/get-trans-by-id/:transactionId', [], async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        return await res.status(200).json(await TransactionController.getTransactionById(transactionId));
    } catch (error) {
        return res.status(400).json({ error: error })
    }
})

//http://localhost:3000/api/transactions/delete-by-id
router.delete('/delete-by-id/:transactionId', [], async (req, res, next) => {
    try {
        const { transactionId } = req.params;
        return res.status(200).json(await TransactionController.deleteTransaction(transactionId));
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
})

//http://localhost:3000/api/transactions
router.put('/', [], async (req, res, next) => {
    try {
        const { _id, name, money, note, image, category } = req.body;
        const trans = {_id, name, money, note, image, category};        
        return res.status(200).json(await TransactionController.updateTransaction(trans));
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
})

module.exports = router;

