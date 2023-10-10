
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  addItemController,
  getAllItemsController,
  updateItemController,
  deleteItemController,
  signInController,
  signUpController,
  getItemByIdController,
  getItemByUserController
} = require("../Controllers/controller");
const { createNotificationController, getNotificationsByIdController } = require("../Controllers/notificationController");

const router = express.Router();

// Create the directory if not exists
const dir = path.join(__dirname, "../FrontEnd/images/uploadedImage");
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

// Create storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../FrontEnd/images/uploadedImage/");
  },
  filename: function (req, file, cb) {
    const fileaName = Date.now() + "-" + file.originalname;
    cb(null, fileaName);
  },
});

const upload = multer({ storage: storage });
// POST call for adding item to collection with file upload
router.post("/add-item", upload.single("itemImage"), addItemController);

router.post("/signup", signUpController);
router.post("/signin", signInController);

//GET call to fetch all items
router.get("/items", getAllItemsController);

//GET call to fetch single item by id
router.get("/items/:id", getItemByIdController);

//GET call to fetch all item posted by particular user
router.get("/my-items/:id", getItemByUserController);

//DELETE call to delete item by id
router.delete("/delete-item/:id", deleteItemController);

//POST call to create notification
router.post("/add-notification", createNotificationController)

//GET call to fetch notifications
router.get("/notifications/:id", getNotificationsByIdController)

module.exports = router;

