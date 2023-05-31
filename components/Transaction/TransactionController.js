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

module.exports = { searchTransactionById, searchProductByCategory, searchProductByMoney, searchProductByNote , searchTotalExpense, searchtotalIncome};