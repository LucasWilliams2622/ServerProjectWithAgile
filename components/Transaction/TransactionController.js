const TransactionService = require('./TransactionService');






const addNew = async (money, note, category, idUser, createAt, updateAt) => {
    try {
        return await TransactionService.addNew(money, note, category, idUser, createAt, updateAt);
    } catch (error) {
        console.log('Add New Transaction error: ', error);
    }
    return null;
}


const deleteById = async (id) => {
    try {
        return await TransactionService.deleteById(id);
    } catch (error) {
        console.log('Delete Transaction By Id error: ', error);
    }
    return null;
}

const editById = async (id, money, note, category, idUser, createAt, updateAt) => {
    try {
        return await TransactionService.editById(id, money, note, category, idUser, createAt, updateAt);
    } catch (error) {
        console.log('Edit Transaction By Id error: ', error);
    }
    return null;
}

const searchTransactionById = async (id) => {
    try {
        return await TransactionService.searchTransactionById(id);
    } catch (error) {
        console.log('Search Transaction By Id error: ', error);
    }
    return null;
}

const searchTransactionByCategory = async (category) => {
    try {
        return await TransactionService.searchTransactionByCategory(category);
    } catch (error) {
        console.log('Search Transaction By Category error: ', error);
    }
    return null;
}

const searchTransactionByMoney = async (money) => {
    try {
        return await TransactionService.searchTransactionByMoney(money);
    } catch (error) {
        console.log('Search Transaction By Money error: ', error);
    }
    return null;
}

const searchTransactionByNote = async (note) => {
    try {
        return await TransactionService.searchTransactionByNote(note);
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
// const addNewTransaction = async (name, money, note, image, category) => {
//     try {
//         return await TransactionService.addNewTransaction(name, money, note, image, category);
//     } catch (error) {
//         console.log("error: ", error);
//         throw error;
//     }
// }
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


module.exports = {
    addNew, deleteById, editById, searchTransactionById,
    searchTransactionByCategory, searchTransactionByMoney, searchTransactionByNote
};