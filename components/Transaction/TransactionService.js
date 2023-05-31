
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

//http://localhost:3000/api/transactions/new
//them moi giao dich
const addNewTransaction = async (name, money, note, image, category, createAt, updateAt) => {
    try {
        const newTransaction = { name, money, note, image, category, createAt, updateAt };
        const trans = new TransactionModel(newTransaction);
        await trans.save();
        return true;
    } catch (error) {
        console.log('Search Transaction By Id: ', error);
        return null;
    }
}

module.exports = {addNewTransaction};
