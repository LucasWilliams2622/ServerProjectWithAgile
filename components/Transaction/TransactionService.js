const TransactionModel = require('./TransactionModel');
const CategoryModel = require('../Category/CategoryService');
const UserModel = require('../User/UserModel');



const getAll = async (idUser) => {
    try {
        let transaction = await TransactionModel.find({ idUser: idUser },)
            .populate('category', 'name image type');
        // console.log(transaction);
        if (transaction) {
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
        const transaction = await TransactionModel.findById(id, idUser)
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

const searchTransactionByCategory = async (idUser, categoryName) => {
    try {
        console.log(idUser, categoryName);
        const user = await TransactionModel.find({ idUser: idUser })
            .populate('category', 'name type image')
        console.log("==============>", user);
        if (user) {
            const category = await TransactionModel.find({ "category.name": "AA" })
            console.log(category)

            console.log(category.length)
            if (category.length > 0) {
                const transactions = category[0];
                console.log(transactions);
                return transactions;
            } else {
                return false;
            }
        } else {
            return false
        }
        const category = await TransactionModel.aggregate([
            { $match: { idUser: idUser } },
            { $lookup: { from: 'categories', localField: 'category', foreignField: '_id', as: 'category' } },
            { $unwind: '$category' },
            { $match: { 'category.name': 'Đồ điện tử' } }
        ]);
        console.log(category);
        if (category.length > 0) {
            transactions = category;
            console.log(transactions);
            return transactions;
        } else {
            return false;
        }
    } catch (error) {
        console.log('Search Transaction By Category: ', error);
        return null;
    }
}

const searchTransactionByMoney = async (money, idUser) => {
    try {
        const user = await TransactionModel.findOne({ idUser: idUser })
            .populate('category', 'name image type');

        console.log(user);
        if (user != null) {
            return await TransactionModel.find({ money: money })
                .populate('category', 'name image type');
        } else {
            return false
        }
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

const getTotalMoney = async (idUser) => {
    try {
        let transaction = await TransactionModel.find({ idUser: idUser },)
            .populate('category', 'name image type');
        // console.log(transaction);
        if (transaction) {
            let totalIncome = 0;
            let totalExpense = 0;
            let totalMoney = 0;

            for (let i = 0; i < transaction.length; i++) {
                const category = transaction[i].category;
                const money = transaction[i].money;
                if (category.type) {
                    totalExpense += money;
                } else {
                    totalIncome += money;
                }
            }
            if (totalIncome < totalExpense) {
                totalMoney = -1 * (totalExpense - totalIncome);
            } else {
                totalMoney = totalIncome - totalExpense;
            }
            // console.log("Total income: " + totalIncome);
            // console.log("Total expense: " + totalExpense);
            console.log("Total money: " + totalMoney);
            let userTrans = await UserModel.findOne({ _id: idUser }, "limit totalMoney totalExpense totalIncome name _id ")
            userTrans.totalExpense = totalExpense;
            userTrans.totalIncome = totalIncome;
            userTrans.totalMoney = totalMoney;
            console.log(userTrans.limit);
            console.log(userTrans.totalExpense);
            console.log(userTrans.totalIncome);
            console.log(userTrans.totalMoney);
            console.log(userTrans);
            return userTrans
        } else {
            return false
        }
    } catch (error) {
        console.log('Search Transaction By Note: ', error);
        return null;
    }
}

const searchByDate = async (createAt, idUser) => {
    try {
        const user = await TransactionModel.findOne({ idUser: idUser }).populate('category', 'name type image')
            .populate('category', 'name image type');

        console.log(user);
        if (user != null) {
            console.log(createAt);
            const startDate = createAt + 'T00:00:00.000Z';
            const endDate = createAt + 'T23:59:59.999Z';
            return await TransactionModel.find({
                createAt: {
                    $gte: startDate,
                    $lte: endDate,
                }, idUser: idUser
            }).populate('category', 'name image type');

        } else {
            return false
        }

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
            const currentDate = createAt + 'T00:00:00.000Z';
            let pastYear = createAt.slice(0, 4)
            let pastMonth = createAt.slice(5, 7)
            let pastDay = parseInt(createAt.slice(8, 10)) - 7;
            pastDay = pastDay < 10 ? "0" + pastDay : pastDay
            pastDay = pastDay > 31 ? 31 : pastDay
            const pastDate = pastYear + "-" + pastMonth + "-" + pastDay + 'T23:59:59.999Z';
            // console.log("past DAY" + pastDate);
            // console.log("currentDate " + currentDate);
            const transaction = await TransactionModel.find({
                createAt: {
                    $gte: pastDate,
                    $lte: currentDate,
                }, idUser: idUser
            }).populate('category', 'name type image').sort({ createAt: -1 });
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
        const user = await TransactionModel.findOne({ idUser: idUser })
        // console.log(user);
        if (user != null) {
            const transaction = await TransactionModel.find({}, "_id money note category idUser createAt")
                .populate('category', 'name image type')
            // console.log(transaction);
            return transaction
        } else {
            return false
        }
    } catch (error) {
        console.log('get all transaction error:', error);
        throw error;
    }
}

const getAllTransactionofaUser = async (idUser) => {
    try {
        const user = await TransactionModel.findOne({ idUser: idUser })
        if (user != null) {
            let transaction = await TransactionModel.find({ idUser: idUser }, 'money note category createAt updateAt totalExpense totalIncome totalMoney')
                .populate('category', 'name type');
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
            transaction.totalExpense = totalExpense;
            transaction.totalIncome = totalIncome;
            transaction.totalMoney = totalMoney;

            console.log("Total income: " + transaction.totalExpense);
            console.log("Total expense: " + transaction.totalIncome);
            console.log("Total money: " + transaction.totalMoney);
            console.log(transaction);
            return transaction
        } else {
            return false
        }
    } catch (error) {
        console.log('Search Transaction By Money: ', error);
        return null;
    }
}

module.exports = {
    addNew, deleteById, editById, getAll, getTotalMoney,
    searchTransactionById, searchTransactionByCategory,
    searchTransactionByMoney, searchTransactionByNote,
    searchByDate, searchByMonth, searchByYear, getAllTransaction,
    searchByRecent, getTransactionById, deleteAll,

};