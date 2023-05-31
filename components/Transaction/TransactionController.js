const TransactionService = require('./TransactionService');

const searchTransactionById = async (id) => {
    try {
        return await TransactionService.searchTransactionById(id);
    } catch (error) {
        console.log('Search Transaction By Id error: ', error);
    }
    return null;
}

const searchProductByCategory = async (category) => {
    try {
        return await TransactionService.searchProductByCategory(category);
    } catch (error) {
        console.log('Search Transaction By Category error: ', error);
    }
    return null;
}

const searchProductByMoney = async (money) => {
    try {
        return await TransactionService.searchProductByCategory(money);
    } catch (error) {
        console.log('Search Transaction By Money error: ', error);
    }
    return null;
}

const searchProductByNote = async (note) => {
    try {
        return await TransactionService.searchProductByCategory(note);
    } catch (error) {
        console.log('Search Transaction By Note error: ', error);
    }
    return null;
}

const searchtotalIncome = async (type) => {
    try {
        return await TransactionService.searchtotalIncome(type);
    } catch (error) {
        console.log('Search Transaction By Note error: ', error);
    }
    return null;
}
const searchTotalExpense = async (category) => {
    try {
        return await TransactionService.searchTotalExpense(category);
    } catch (error) {
        console.log('Search Transaction By Note error: ', error);
    }
    return null;
}
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


module.exports = { searchTransactionById, searchProductByCategory, searchProductByMoney, searchProductByNote , searchTotalExpense, searchtotalIncome,
    addNewTransaction, getTransactions, getTransactionById, deleteTransaction, updateTransaction
};