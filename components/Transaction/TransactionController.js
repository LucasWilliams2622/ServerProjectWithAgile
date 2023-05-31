const TransactionService = require('./TransactionService');


const addNewTransaction = async (name, money, note, image, category) => {
    try {
        return await TransactionService.addNewTransaction(name, money, note, image, category);
    } catch (error) {
        console.log("error: ", error);
        throw error;
    }
}

const getTransactions = async () => {
    try {
        return await TransactionService.getTransactions();
    } catch (error) {
        throw error;
    }
}

const getTransactionById = async (transactionId) => {
    try {
        return await TransactionService.getTransactionById(transactionId);
    } catch (error) {
        throw error;
    }
}

const deleteTransaction = async (transactionId) => {
    try {
        const result = await TransactionService.deleteTransaction(transactionId);
        return result;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

const updateTransaction = async (transaction) => {
    try {
        const oldTransaction = TransactionService.getTransactionById(transaction._id);
        transaction = {
            ...oldTransaction, ...transaction
        }
        const result = await TransactionService.updateTransaction(transaction);
        return result;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {addNewTransaction, getTransactions, getTransactionById, deleteTransaction, updateTransaction};