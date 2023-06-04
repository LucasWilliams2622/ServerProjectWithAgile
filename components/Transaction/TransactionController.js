const TransactionService = require('./TransactionService');

const getAll = async () => {
    try {
        return await TransactionService.getAll();
    } catch (error) {
        console.log('Add New Transaction error: ', error);
    }
    return null;
}

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

const getAllMoney = async () => {
    try {
        return await TransactionService.getAllMoney();
    } catch (error) {
        console.log('Search Transaction By Note error: ', error);
    }
    return null;
}

const searchByDate = async (date) => {
    try {
        return await TransactionService.searchByDate(date);
    } catch (error) {
        console.log('Search Transaction By date error: ', error);
    }
    return null;
}
const searchByRecent = async (date) => {
    try {
        return await TransactionService.searchByRecent(date);
    } catch (error) {
        console.log('Search Transaction By date error: ', error);
    }
    return null;
}

const searchByMonth = async (month) => {
    try {
        return await TransactionService.searchByMonth(month);
    } catch (error) {
        console.log('Search Transaction By month error: ', error);
    }
    return null;
}
const searchByYear = async (year) => {
    try {
        return await TransactionService.searchByYear(year);
    } catch (error) {
        console.log('Search Transaction By year error: ', error);
    }
    return null;
}
const getAllTransaction = async (page,size) =>{
    try {
        return await TransactionService.getAllTransaction(page,size);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll, addNew, deleteById, editById,
    searchTransactionById, getAllMoney, searchTransactionByCategory,
    searchTransactionByMoney, searchTransactionByNote, searchByDate,
    searchByMonth,searchByYear,getAllTransaction,searchByRecent

};