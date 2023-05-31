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

const addNewTransaction = async (name, money, note, image, category, createAt, updateAt) => {
    try {
        return await TransactionService.addNewTransaction(name, money, note, image, category, createAt, updateAt);
    } catch (error) {
        console.log("error: ", error);
        return false;
    }
    return null;
}

module.exports = {addNewTransaction};