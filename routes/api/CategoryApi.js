const express = require('express');
const router = express.Router();
const categoryController = require('../../components/Category/CategoryController')

//http://localhost:3000/api/categories/new
router.post('/new', [], async (req, res, next) => {
    try {
        const { name } = req.body;
        const category = 
        {
            name: name,
        }
        const result = await categoryController.saveCategory(category);
        return res.status(200).json({ ...result });
    } catch (error) {
        return res.status(400).json({ error: error })
    }
})

//http://localhost:3000/api/categories/get-all-categories
router.get('/get-all-categories', [], async (req, res, next) => {
    try {
        return await res.status(200).json(await categoryController.getCategories());
    } catch (error) {
        return res.status(400).json({ error: error })
    }
})

//http://localhost:3000/api/categories/get-by-id
router.get('/get-by-id', [], async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        return await res.status(200).json(await categoryController.getCategoryById(categoryId));
    } catch (error) {
        return res.status(400).json({ error: error })
    }
})

//http://localhost:3000/api/categories/delete-by-id
router.delete('/delete-by-id', [], async (req, res, next) => {
    try {
        const { categoryId } = req.params;
        return res.status(200).json(await categoryController.deleteCategory(categoryId));
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
})

//http://localhost:3000/api/categories
router.put('/', [], async (req, res, next) => {
    try {
        const { _id, name } = req.body;
        const category = {
            _id: _id,
            name: name 
        }
        return res.status(200).json(await categoryController.updateCategory(category));
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
})
module.exports = router;