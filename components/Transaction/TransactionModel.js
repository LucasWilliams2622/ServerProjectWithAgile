const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const transactionSchema = new Schema({
  id: { type: ObjectId },
  money: { type: Number, required: true },
  note: { type: String, default: "" },
  category: { type: ObjectId, ref: 'Category' },

  idUser:{type:ObjectId,ref:'User'},
  createAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now },

  limit : {type: Number, default: 0},
  totalIncome : {type: Number, default: 0},
  totalExpense : {type: Number, default: 0},
  totalMoney : {type: Number, default: 0},
});

module.exports = mongoose.models.transaction || mongoose.model('Transaction', transactionSchema);
