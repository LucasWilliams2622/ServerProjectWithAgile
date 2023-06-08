const TransactionModel = require('./TransactionModel');
const CategoryModel = require('../Category/CategoryService');


const getAll = async (idUser) => {
    try {
        const user = await TransactionModel.findOne({ idUser: idUser })
        console.log(user);
        if (user != null) {
            let transaction = await TransactionModel.find({ idUser: idUser }, 'money note category createAt updateAt')
                .populate('category', 'name image type');
            console.log(transaction);
            let totalIncome = 0;
            let totalExpense = 0;

            for (let i = 0; i < transaction.length; i++) {
                const category = transaction[i].category;
                const money = transaction[i].money;
                if (category.type) {
                    totalExpense += money;
                } else {
                    totalIncome += money;
                }
            }

            let totalMoney = totalIncome - totalExpense
            console.log("Total income: " + totalIncome);
            console.log("Total expense: " + totalExpense);
            console.log("Total money: " + totalMoney);
            user.totalExpense = totalExpense;
            user.totalIncome = totalIncome;
            user.totalMoney = totalMoney;

            console.log("Total income: " + user.totalExpense);
            console.log("Total expense: " + user.totalIncome);
            console.log("Total money: " + user.totalMoney);
            return transaction
        } else {
            return false
        }
    } catch (error) {
        console.log('Search Transaction By Money: ', error);
        return null;
    }
}

const deleteAll = async (idUser) => {
    try {
        const user = await TransactionModel.findOne({ idUser: idUser })
        console.log("======>", user);
        if (user != null) {
            const transaction = await TransactionModel.deleteMany({ idUser: idUser })

            console.log("======>", transaction);
            // for (let i = 0; i < transaction.length; i++) {
            //     const idUser = transaction[i].idUser;
            //     if (idUser) {

            //     }
            // }
            return transaction
        } else {
            return false;
        }
    } catch (e) {
        console.log("EROOR Delete All: " + e);
        return false
    }
}

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

const editById = async (id, money, note, category, idUser, createAt, updateAt) => {
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

const getTransactionById = async (id) => {
    try {
        return await TransactionModel.findById(id);
    } catch (error) {
        console.log('Get Transaction By Id: ', error);
        return null;
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

const searchTransactionByCategory = async (idUser, category) => {
    try {
        const user = await TransactionModel.findOne({ idUser: idUser }).populate('category', 'name type')
        console.log("==============>", user);
        if (user) {
            const category = await CategoryModel.find({ name: "Đồ uống" })
            console.log(category)
        }
        const category = await CategoryModel.find({ name: "Đồ uống" })
        console.log(category)

        return user

        // if (user != null) {
        //     const transaction = await TransactionModel.find({ category: { $regex: category, $options: 'i' } });
        //     console.log(transaction);
        //     return transaction
        // } else {
        //     return false
        // }
    } catch (error) {
        console.log('Search Transaction By Category: ', error);
        return null;
    }
}

const searchTransactionByMoney = async (money) => {
    try {
        // return await TransactionModel.find({ money: { $regex: money, $options: 'i' } });
        return await TransactionModel.find({ money });
    } catch (error) {
        console.log('Search Transaction By Money: ', error);
        return null;
    }
}

const searchTransactionByNote = async (note) => {
    try {
        // return await TransactionModel.find({ note: { $regex: note, $options: 'i' } });
        return await TransactionModel.find({ note });

    } catch (error) {
        console.log('Search Transaction By Note: ', error);
        return null;
    }
}

const getAllMoney = async () => {
    try {
        // return await TransactionModel.find({ note: { $regex: note, $options: 'i' } });
        const transactions = await TransactionModel.find({}, 'money')
        const totalMoney = transactions.
            reduce((accumulator, currentValue) => accumulator + currentValue.money, 0);
        console.log(totalMoney); // Kết quả sẽ là 27642
        return totalMoney;
    } catch (error) {
        console.log('Search Transaction By Note: ', error);
        return null;
    }
}

const searchByDate = async (createAt) => {
    try {
        const startDate = createAt + 'T00:00:00.000Z';
        const endDate = createAt + 'T23:59:59.999Z';
        return await TransactionModel.find({
            createAt: {
                $gte: startDate,
                $lte: endDate,
            },
        });
    } catch (error) {
        console.log('Search Transaction By Id: ', error);
        return null;
    }
}
const searchByRecent = async (createAt, idUser) => {
    try {
        const user = await TransactionModel.findOne({ idUser: idUser })
        console.log(user);
        if (user != null) {
            const startDate = createAt + 'T00:00:00.000Z';
            let endYear = createAt.slice(0, 4)
            let endMonth = createAt.slice(5, 7)
            let endDay = parseInt(createAt.slice(8, 10)) + 3;
            endDay = endDay < 10 ? "0" + endDay : endDay
            const endDate = endYear + "-" + endMonth + "-" + endDay + 'T23:59:59.999Z';
            console.log("END DAY" + endDate);
            console.log("START DAY" + startDate);

            const transaction = await TransactionModel.find({
                createAt: {
                    $gte: startDate,
                    $lte: endDate,
                },
            },).populate('category', 'name type')
            console.log(transaction);
            return transaction;
        } else {
            return false
        }
    } catch (error) {
        console.log('Search Transaction By Id: ', error);
        return null;
    }
}

const searchByMonth = async (month) => {
    try {
        const startDate = month + '-01T00:00:00.000Z';
        const endDate = month + '-31T23:59:59.999Z';
        const transactions = await TransactionModel.find({
            createAt: {
                $gte: startDate,
                $lte: endDate,
            },
        });
        return transactions
    } catch (error) {
        console.log('Search Transaction By Id: ', error);
        return null;
    }
}

const searchByYear = async (year) => {
    try {
        const startDate = year + '-01-01T00:00:00.000Z';
        const endDate = year + '-12-31T23:59:59.999Z';
        const transactions = await TransactionModel.find({
            createAt: {
                $gte: startDate,
                $lte: endDate,
            },
        });
        return transactions
    } catch (error) {
        console.log('Search Transaction By Id: ', error);
        return null;
    }
}

const getAllTransaction = async (idUser) => {
    try {
        // return data;
        // return await TransactionModel.find({},"_id  money  note category idUser createAt").
        // populate('category', 'type name');
        const user = await TransactionModel.findOne({ idUser: idUser })
        console.log(user);
        if (user != null) {
            const transaction = await TransactionModel.find({}, "_id money note category idUser createAt")
                .populate('category', 'name image type')
            console.log(transaction);

            return transaction
        } else {
            return false
        }

    } catch (error) {
        console.log('get all transaction error:', error);
        throw error;
    }
}


module.exports = {
    addNew, deleteById, editById, getAll, getAllMoney,
    searchTransactionById, searchTransactionByCategory,
    searchTransactionByMoney, searchTransactionByNote,
    searchByDate, searchByMonth, searchByYear, getAllTransaction,
    searchByRecent, getTransactionById, deleteAll,

};