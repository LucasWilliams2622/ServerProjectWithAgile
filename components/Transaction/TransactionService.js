const TransactionModel = require('./TransactionModel');


//http://localhost:3000/api/transactions/new
//them moi giao dich
const addNewTransaction = async (name, money, note, image, category) => {
    try {
        const newTransaction = { name, money, note, image, category };
        const trans = new TransactionModel(newTransaction);
        await trans.save();
        return true;
    } catch (error) {
        console.log('Add new transaction error: ' + error);
        return false;
    }
}

//http://localhost:3000/api/transactions/get-all-trans
const getTransactions = async () => {
    return await TransactionModel.find({});
}

//http://localhost:3000/api/transactions/get-trans-by-id
const getTransactionById = async (transactionId) => {
    return await TransactionModel.find({ _id: transactionId });
}

//http://localhost:3000/api/transactions/delete-by-id
const deleteTransaction = async (transactionId) => {
    return await TransactionModel.deleteOne({ _id: transactionId });
}

//http://localhost:3000/api/transactions
const updateTransaction = async (transaction) => {
    return await TransactionModel.findOneAndUpdate({ _id: transaction._id }, 
        transaction, { new: true });
}

// đã push lên
module.exports = { addNewTransaction, getTransactions, getTransactionById, deleteTransaction, updateTransaction };
