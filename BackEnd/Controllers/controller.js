const {
  testModel,
  getAllSumModel,
  addItemModel,
  getItemsModel,
  updateItemModel,
  deleteItemModel,
} = require("../Models/itemModel");

const getAllSums = async (req, res) => {
  try {
    const data = await getAllSumModel();
    res.status(200).json({ data, message: "fetched all data" });
  } catch (error) {
    console.log("Error is getAllSums: ", error);
  }
};

const testController = async (req, res) => {
  try {
    console.log("controller works!");
    const obj = {
      num1: parseInt(req.query.num1),
      num2: parseInt(req.query.num2),
      sum: parseInt(req.query.num1) + parseInt(req.query.num2),
    };
    const response = await testModel(obj);
    res.status(201).json({
      statusCode: 201,
      message: "Numbers and their sum saved successfully",
      data: response.insertedId,
    });
  } catch (error) {
    console.log("Error in testController: ", error);
    res.status(500).json({ statusCode: 500, message: "Internal server error" });
  }
};

const addItemController = async (req, res) => {
  try {
    const item = req.body.item || {};
    //Check for proper data
    if (!item.title || !item.description) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Inappropriate data provided" });
    }
    const response = await addItemModel(item);
    return res.status(201).json({
      statusCode: 201,
      message: "Item added successfully",
      data: response.insertedId,
    });
  } catch (error) {
    console.log("Error in addItem controller: ", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error" });
  }
};

const getAllItemsController = async (req, res) => {
  try {
    const data = await getItemsModel();
    return res.status(200).json({
      statusCode: 201,
      data,
      message: "fetched all items successfully",
    });
  } catch (error) {
    console.log("Error in getAllItems controller: ", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error" });
  }
};

const updateItemController = async (req, res) => {
  try {
    const itemId = req.params.id || "";
    const item = req.body.item || {};
    //Check for proper data
    if (!itemId || !item.title || !item.description) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Inappropriate data provided" });
    }
    const response = await updateItemModel(itemId, item);
    return res
      .status(200)
      .json({ statusCode: 200, message: "Item updated successfully" });
  } catch (error) {
    console.log("Error in updateItem controller: ", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error" });
  }
};

const deleteItemController = async (req, res) => {
  try {
    const itemId = req.params.id || "";
    //Check for proper data
    if (!itemId) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "Inappropriate data provided" });
    }
    const response = await deleteItemModel(itemId);
    return res
      .status(200)
      .json({ statusCode: 200, message: "Item deleted successfully" });
  } catch (error) {
    console.log("Error in deleteItem controller: ", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error" });
  }
};

module.exports = {
  testController,
  getAllSums,
  addItemController,
  getAllItemsController,
  updateItemController,
  deleteItemController,
};
