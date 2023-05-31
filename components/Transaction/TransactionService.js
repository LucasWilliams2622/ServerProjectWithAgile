const TransactionModel = require('./TransactionModel');


const addNew = async (money, note, category, idUser, createAt, updateAt) => {
    try {
        const newTransaction = { money, note, category, idUser, createAt, updateAt }
        const transaction = new TransactionModel(newTransaction);
        await transaction.save();
        return true;
    } catch (e) {
        console.log("EROOR Add new" + e);
        return false
    }
}

const deleteById = async (id) => {
    try {
        await TransactionModel.findByIdAndDelete(id);
        return true;
    } catch (e) {
        console.log("EROOR Delete" + e);
        return false
    }
}

const editById = async (id,money, note, category, idUser, createAt, updateAt) => {
    try {
        const transaction = await TransactionModel.findById(id)
        if (transaction) {
            transaction.money = money ? money : transaction.money;
            transaction.note = note ? note : transaction.note;
            transaction.category = category ? category : transaction.category;
            transaction.createAt = createAt ? createAt : transaction.createAt;
            transaction.updateAt = updateAt ? updateAt : transaction.updateAt;
            await transaction.save();
            return true;
        }
        return false
    } catch (e) {
        console.log("EROOR Update" + e);
        return false
    }
}

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
        // return await TransactionModel.find({ money: { $regex: money, $options: 'i' } });
        return await TransactionModel.find({money});
    } catch (error) {
        console.log('Search Transaction By Money: ', error);
        return null;
    }
}

const searchTransactionByNote = async (note) => {
    try {
        // return await TransactionModel.find({ note: { $regex: note, $options: 'i' } });
        return await TransactionModel.find({note});

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

const searchtotalIncome = async (type) => {
    try {
        return await TransactionModel.find({ type: type }).populate('Incomne');
    } catch (error) {
        console.log('Search search Total Income: ', error);
        return null;
    }
}
    ;
// const searchTotalExpense = async (category) => {
//     try {
//         const a = await TransactionModel
//         .find({},'category')
//         .populate("category", 'type');

//         console.log("=====================>",a);
//         return true

//     } catch (error) {
//         console.log('Search Total Expense: ', error);
//         return null;
//     }
// }
module.exports = {
    addNew,deleteById,editById,




    searchTransactionById, searchTransactionByCategory, searchTransactionByMoney,
    searchTransactionByNote, searchTransactionByDate, searchTransactionByMounth,
    searchtotalIncome
};