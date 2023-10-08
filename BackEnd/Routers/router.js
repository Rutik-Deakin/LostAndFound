const express = require('express');
const { testController, getAllSums, addItemController, getAllItemsController, getItemByIdController, updateItemController, deleteItemController, signInController, signUpController } = require('../Controllers/controller');
const router = express.Router();


router.get('/', getAllSums);

router.get('/add', testController);

//POST call for add item to collection
router.post('/add-item', addItemController);

router.post("/signup", signUpController);
router.post("/signin", signInController);

//GET call to get all items from collection
router.get('/items', getAllItemsController);

//GET call to get all items from collection
router.get('/items/:id', getItemByIdController);

//We can also use patch method to update document
router.post('/add-item/:id', updateItemController);

//DELETE call to delete item from collection
router.delete('/delete-item/:id', deleteItemController);

module.exports = router;