const CategoryModel = require('./CategoryModel');

const getCategories = async () => {
  return await CategoryModel.find({});
}

const getCategoryById = async (categoryId) => {
  return await CategoryModel.find({_id : categoryId});
}

const saveCategory = async (category) => {
  const categoryModel = new CategoryModel(category);
  return await categoryModel.save();
}

const deleteCategory = async (categoryId) => {
  return await CategoryModel.deleteOne({_id: categoryId});
}

const updateCategory = async (category) => {
  return await CategoryModel.findOneAndUpdate({_id: category._id}, category, {new: true});
}

module.exports = { getCategories, saveCategory, deleteCategory, updateCategory, getCategoryById };

