const {
  addItemModel,
  getItemsModel,
  updateItemModel,
  deleteItemModel,
  getItemByIdModel
} = require("../Models/itemModel");
const { addUserModel, getUserModel } = require("../Models/userModel");
const addItemController = async (req, res) => {
  try {
    const item = req.body.item || {};

    const image = req.file;
    const imagePath = image.path.replace(/\\/g, "/");
    if (image && image.path) {
      // Check if image and image.path are defined
      item.imagePath = image.path;
    }

    console.log("test");
    const itemObj = JSON.parse(item);
    const response = await addItemModel({ ...itemObj, image: imagePath });
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

const getItemByIdController = async (req, res) => {
  try {
    const id = req.params.id || "";
    const itemObj = await getItemByIdModel(id);
    const data = itemObj[0];
    return res.status(200).json({
      statusCode: 201,
      data,
      message: "fetched item successfully",
    });
  } catch (error) {
    console.log("Error in getItemByIdController controller: ", error);
    return res
      .status(500)
      .json({ statusCode: 500, message: "Internal server error" });
  }
}

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

const signUpController = async (req, res) => {
  try {
    const userInfo = req.body;
    if (
      !userInfo.firstname ||
      !userInfo.lastname ||
      !userInfo.phone ||
      !userInfo.email ||
      !userInfo.password
    ) {
      return res
        .status(400)
        .json({ statusCode: 400, error: "Inappropriate data provided" });
    }
    const response = await addUserModel(userInfo);
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "User sign up successfully",
    });
  } catch (error) {
    console.log("Error in addUser controller: ", error);
    return res
      .status(500)
      .json({ statusCode: 500, error: "Internal server error" });
  }
};

const signInController = async (req, res) => {
  try {
    const loginInfo = req.body;
    if (!loginInfo.email || !loginInfo.password) {
      return res
        .status(400)
        .json({ statusCode: 400, error: "Inappropriate data provided" });
    }
    const response = await getUserModel(loginInfo.email);
    if (!response || response.password != loginInfo.password) {
      return res
        .status(401)
        .json({ statusCode: 400, error: "Email or password incorrect" });
    }
    return res.status(200).json({
      statusCode: 200,
      message: "User sign in successfully",
      success: true,
      data: response,
    });
  } catch (error) {
    console.log("Error in addUser controller: ", error);
    return res
      .status(500)
      .json({ statusCode: 500, error: "Internal server error" });
  }
};

module.exports = {
  addItemController,
  getAllItemsController,
  getItemByIdController,
  updateItemController,
  deleteItemController,
  signUpController,
  signInController,
};
