
const TransactionModel = require('./TransactionModel');

const searchTransactionById = async (id) => {
    try {
        return await TransactionModel.findById(id);
    } catch (error) {
        console.log('Search Transaction By Id: ', error);
        return null;
    }
}

const searchTransactionByCategory = async (category) => {
    try {
        return await TransactionModel.find({ category: { $regex: category, $options: 'i' } });
    } catch (error) {
        console.log('Search Transaction By Category: ', error);
        return null;
    }
}

const searchTransactionByMoney = async (money) => {
    try {
        return await TransactionModel.find({ money: { $regex: money, $options: 'i' } });
    } catch (error) {
        console.log('Search Transaction By Money: ', error);
        return null;
    }
}

const searchTransactionByNote = async (note) => {
    try {
        return await TransactionModel.find({ note: { $regex: note, $options: 'i' } });
    } catch (error) {
        console.log('Search Transaction By Note: ', error);
        return null;
    }
}

const searchTransactionByDate = async (createAt) => {
    try {
        return await TransactionModel.find(createAt);
    } catch (error) {
        console.log('Search Transaction By Id: ', error);
        return null;
    }
}

const searchTransactionByMounth = async (createAt) => {
    try {
        return await TransactionModel.find(createAt);
    } catch (error) {
        console.log('Search Transaction By Id: ', error);
        return null;
    }
}

const searchTransactionByYear = async (createAt) => {
    try {
        return await TransactionModel.find(createAt);
    } catch (error) {
        console.log('Search Transaction By Id: ', error);
        return null;
    }
}

const searchtotalIncome = async (type) => {
    try {
        return await TransactionModel.find({type: type }).populate('Incomne');
    } catch (error) {
        console.log('Search search Total Income: ', error);
        return null;
    }
}
const searchTotalExpense = async (category) => {
    try {
        const a = await TransactionModel
        .find({},'category')
        .populate("category", 'type');
        
        console.log("=====================>",a);
        return true

    } catch (error) {
        console.log('Search Total Expense: ', error);
        return null;
    }
}
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

module.exports = {
    searchTransactionById, searchTransactionByCategory, searchTransactionByMoney,
    searchTransactionByNote, searchTransactionByDate, searchTransactionByMounth,
    searchTransactionByYear, searchTotalExpense, searchtotalIncome , addNewTransaction, 
     getTransactions, getTransactionById, deleteTransaction, updateTransaction 
};