
var express = require('express');
var router = express.Router();
const TransactionController = require('../../components/Transaction/TransactionController');



//http://localhost:3000/transaction/api/add-new
router.post('/add-new', async (req, res, next) => {
    try {
        const { money, note, category, idUser, createAt, updateAt } = req.body;
        const transaction = await TransactionController.addNew( money, note, category, idUser, createAt, updateAt);

        if (transaction) {
            return res.status(200).json({ message: "Add new success", result: true, transaction: transaction });
        }
        return res.status(400).json({ message: "Add new failed", result: false, transaction: transaction });

    } catch (error) {
        console.log('Search Transaction by Id error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api/delete-by-id
router.delete('/delete-by-id', async (req, res, next) => {
    try {
        const { id} = req.query;
        const transaction = await TransactionController.deleteById(id);
        if (transaction) {
            return res.status(200).json({ message: "Delete success", result: true, transaction: transaction });
        }
        return res.status(400).json({ message: "Delete failed", result: false, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Id error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

//http://localhost:3000/transaction/api/edit-by-id
router.put('/edit-by-id', async (req, res, next) => {
    try {
        const { id} = req.query;
        const { money, note, category, idUser, createAt, updateAt } = req.body;
        const transaction = await TransactionController.editById(id,money, note, category, idUser, createAt, updateAt);
        if (transaction) {
            return res.status(200).json({ message: "Edit success", result: true, transaction: transaction });
        }
        return res.status(400).json({ message: "Delete failed", result: false, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Id error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});

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

//CHƯA XONG ĐANG LỖI
//http://localhost:3000/transaction/api/search-by-category?category=
router.get('/search-by-category', async (req, res, next) => {
    try {
        const { category } = req.query;
        const transaction = await TransactionController.searchTransactionByCategory(category);
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
        const transaction = await TransactionController.searchTransactionByMoney(money);
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
        const transaction = await TransactionController.searchTransactionByNote(note);
        return res.status(200).json({ result: true, transaction: transaction });
    } catch (error) {
        console.log('Search Transaction by Note error: ', error)
        return res.status(500).json({ result: false, transaction: null });
    }
});


module.exports = router;